# 👨‍💼 EDUPLATFORM - ADMIN PANEL REQUIREMENTS

## Current Status: ❌ NOT IMPLEMENTED

**Implementation Progress: 0%**

The `admin` role exists in the database and authentication system, but **no admin-specific functionality** has been implemented in either the frontend or backend.

---

## REQUIRED ADMIN FUNCTIONALITY

### 1. Admin Dashboard

**Status:** ❌ MISSING

**Required Metrics:**
- Total users (students, teachers, admins)
- Total courses (published, unpublished)
- Total lessons
- Active users (last 7/30 days)
- Course enrollments
- Lesson completions
- System health (API status, database status, disk space)
- Recent activity feed
- Security events (failed logins, role changes)

**UI Location:** `/admin` or `/admin/dashboard`

---

### 2. User Management

**Status:** ❌ MISSING

**Required Features:**

#### 2.1 User List
- View all users with filtering (role, status, date joined)
- Search by name, email
- Sort by various fields
- Pagination
- Bulk actions (export, delete)

#### 2.2 User Details
- View full profile (all fields from users table)
- View user statistics (lessons completed, courses enrolled, activity history)
- View user progress (current level, XP, study time)
- View user notes, schedule entries (read-only or with edit capability)

#### 2.3 User Actions
- **Create User:** Admin can manually create accounts
- **Edit User:** Update first_name, last_name, email (with verification)
- **Change Role:** student ↔ teacher ↔ admin (with confirmation)
- **Block/Unblock User:** Set is_active flag
- **Delete User:** Soft delete or hard delete with CASCADE warning
- **Reset Password:** Generate secure reset link or set temporary password
- **View Login History:** Track authentication events
- **View Activity Log:** All user actions

---

### 3. Role-Based Access Control (RBAC)

**Status:** 🟡 PARTIAL (roles defined but not enforced)

**Required Implementation:**

#### 3.1 Backend RBAC Middleware
```typescript
// middleware/authorize.ts
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

// Usage in routes:
router.get('/admin/users', authenticateToken, authorize('admin'), getAllUsers);
```

#### 3.2 Admin-Only Endpoints
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Edit user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/role` - Change role
- `PUT /api/admin/users/:id/status` - Block/unblock
- `GET /api/admin/statistics` - System-wide stats
- `GET /api/admin/audit-logs` - View audit trail

---

### 4. Course Management

**Status:** 🟡 PARTIAL (teacher can create, but admin features missing)

**Required Admin Features:**

#### 4.1 Enhanced Course Control
- View ALL courses (published and unpublished)
- Override teacher ownership (admin can edit any course)
- Permanently delete courses
- Bulk operations (publish/unpublish multiple)
- Assign/reassign teachers to courses
- View course enrollment statistics
- View course completion rates

#### 4.2 Course Approval Workflow (Optional)
- Teachers submit courses for approval
- Admin reviews and approves/rejects
- Comments/feedback on rejections

---

### 5. Lesson Management

**Status:** ❌ MISSING

**Required Features:**
- View all lessons across all courses
- Create/edit/delete lessons for any course
- Reorder lessons within courses
- Bulk operations
- View lesson completion statistics

---

### 6. Level Management

**Status:** 🟡 PARTIAL (levels exist but can't be managed)

**Required Features:**
- View all levels (currently 6 default: A1-C1)
- Create new levels
- Edit existing levels (name, code, description, min_lessons_required)
- Reorder levels (order_index)
- Delete levels (with warning about linked courses)
- View level statistics (users per level, courses per level)

---

### 7. System Settings

**Status:** ❌ MISSING

**Required Settings:**
- Platform name and branding
- Email configuration (SMTP settings)
- File upload limits
- Session timeout duration
- Password policy configuration
- Rate limiting thresholds
- Maintenance mode toggle
- Feature flags

---

### 8. Audit Logging

**Status:** ❌ MISSING

**Required Implementation:**

#### 8.1 Database Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES users(id),
  actor_email VARCHAR(255),
  actor_role VARCHAR(50),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_target ON audit_logs(target_type, target_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

#### 8.2 Logged Events
**Security Events:**
- Login attempts (success/failure)
- Logout
- Password changes
- Role changes
- Account creation/deletion
- Permission changes

**Administrative Actions:**
- User CRUD operations
- Course CRUD operations
- System settings changes
- Bulk operations

**Data Access:**
- Admin viewing user data
- Exporting data
- Deleting data

#### 8.3 Admin Audit Log Viewer
- Filter by actor, action, target, date range
- Search functionality
- Export to CSV
- Real-time monitoring

---

### 9. Security Features

#### 9.1 Admin Authentication
- **Current:** Standard JWT (same as users)
- **Required:** Enhanced security
  - Require MFA for admin accounts
  - Session timeout for admin actions (15 minutes)
  - Re-authentication for sensitive operations (user deletion, role changes)
  - IP whitelisting (optional)

#### 9.2 Admin Action Confirmation
- Confirmation modal for destructive actions (delete user, delete course)
- "Type username to confirm" for user deletion
- Undo capability (where applicable)

---

### 10. Reporting & Analytics

**Status:** ❌ MISSING

**Required Reports:**
- User growth over time
- Course popularity
- Lesson completion rates
- User engagement metrics
- Teacher performance metrics
- System usage statistics
- Export to PDF/CSV

---

## IMPLEMENTATION PRIORITY

### 🔴 PHASE 1: Essential Admin Features (5 days)

1. **Admin Dashboard** (1 day)
   - System metrics
   - Recent activity
   - Quick actions

2. **User Management** (2 days)
   - List users with search/filter
   - View user details
   - Edit user (basic fields)
   - Change role
   - Block/unblock

3. **RBAC Enforcement** (1 day)
   - Create authorize() middleware
   - Protect all admin endpoints
   - Test authorization thoroughly

4. **Audit Logging** (1 day)
   - Create audit_logs table
   - Log critical admin actions
   - Basic audit log viewer

---

### 🟡 PHASE 2: Enhanced Features (3 days)

5. **Course Management** (1 day)
   - Admin overrides teacher ownership
   - Bulk operations
   - Course approval workflow

6. **Lesson Management** (1 day)
   - Create/edit/delete lessons
   - Bulk operations

7. **System Settings** (0.5 days)
   - Basic settings UI
   - Save to environment/database

8. **Reporting** (0.5 days)
   - User growth chart
   - Course statistics
   - Export functionality

---

### 🟢 PHASE 3: Advanced Features (2 days)

9. **Advanced Security** (1 day)
   - MFA for admins
   - Re-authentication for sensitive actions
   - IP whitelisting

10. **Advanced Analytics** (1 day)
    - Detailed reporting dashboard
    - Custom date ranges
    - Export to multiple formats

---

## FRONTEND COMPONENTS REQUIRED

### Admin Layout
- `AdminLayout.tsx` - Sidebar navigation, header with admin badge
- Protected by `<AuthGuard>` with role check

### Admin Pages
- `/admin` - Dashboard with metrics
- `/admin/users` - User management table
- `/admin/users/:id` - User details/edit
- `/admin/courses` - Course management
- `/admin/lessons` - Lesson management
- `/admin/levels` - Level management
- `/admin/settings` - System settings
- `/admin/audit-logs` - Audit log viewer
- `/admin/reports` - Analytics and reporting

### Reusable Components
- `DataTable.tsx` - Generic sortable/filterable table
- `UserEditModal.tsx` - Edit user form
- `RoleChangeModal.tsx` - Role change with confirmation
- `DeleteConfirmationModal.tsx` - Destructive action confirmation
- `AdminStats.tsx` - Metric display cards
- `AuditLogEntry.tsx` - Audit log item display

---

## BACKEND ROUTES REQUIRED

### Admin API Routes (`/api/admin/...`)

```typescript
// User Management
GET    /api/admin/users              - List all users
GET    /api/admin/users/:id          - Get user details
POST   /api/admin/users              - Create user
PUT    /api/admin/users/:id          - Update user
DELETE /api/admin/users/:id          - Delete user
PUT    /api/admin/users/:id/role     - Change user role
PUT    /api/admin/users/:id/status   - Block/unblock user
POST   /api/admin/users/:id/reset    - Reset user password

// Course Management (Admin Override)
GET    /api/admin/courses            - List all courses (including unpublished)
PUT    /api/admin/courses/:id/owner  - Reassign course to different teacher
DELETE /api/admin/courses/:id        - Permanently delete course

// Lesson Management
GET    /api/admin/lessons            - List all lessons
POST   /api/admin/lessons            - Create lesson
PUT    /api/admin/lessons/:id        - Update lesson
DELETE /api/admin/lessons/:id        - Delete lesson

// Level Management
POST   /api/admin/levels             - Create level
PUT    /api/admin/levels/:id         - Update level
DELETE /api/admin/levels/:id         - Delete level

// System
GET    /api/admin/statistics         - System-wide statistics
GET    /api/admin/audit-logs         - View audit logs
GET    /api/admin/settings           - Get system settings
PUT    /api/admin/settings           - Update system settings

// Reports
GET    /api/admin/reports/users      - User analytics
GET    /api/admin/reports/courses    - Course analytics
GET    /api/admin/reports/engagement - Engagement metrics
```

---

## DATA MODEL ADDITIONS

### Additional Tables Needed

```sql
-- Audit logging
audit_logs (already defined above)

-- System settings (optional - can use env vars)
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50),  -- string, number, boolean, json
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES users(id)
);

-- Course ownership tracking (if not using creator field)
CREATE TABLE course_teachers (
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES users(id),
  PRIMARY KEY (course_id, teacher_id)
);
```

---

## SECURITY CONSIDERATIONS

### Admin Panel Security Checklist

- [x] Role defined in database (users.role = 'admin')
- [ ] Backend RBAC middleware protecting admin routes
- [ ] Frontend route protection (AuthGuard + role check)
- [ ] Audit logging on all admin actions
- [ ] Rate limiting on admin endpoints
- [ ] CSRF protection on admin actions
- [ ] Input validation on all admin forms
- [ ] Confirmation modals for destructive actions
- [ ] MFA requirement for admin accounts (recommended)
- [ ] Admin session timeout (shorter than regular users)
- [ ] Admin actions logged with IP address and timestamp

---

## USER STORIES

### Admin User Stories

**As an admin, I want to:**

1. View a dashboard with key metrics so I can monitor platform health
2. Search for users by name or email so I can quickly find specific accounts
3. Change a user's role so I can promote students to teachers or assign admin privileges
4. Block abusive users so I can prevent them from accessing the platform
5. View a user's activity history so I can investigate reported issues
6. Delete inactive accounts so I can maintain database cleanliness
7. View all courses (including unpublished) so I can moderate content
8. Reassign courses to different teachers so I can handle teacher departures
9. View system-wide statistics so I can track platform growth
10. View audit logs so I can track administrative actions for security/compliance

---

## ACCEPTANCE CRITERIA

### Definition of Done for Admin Panel

**Minimum Viable Admin Panel (MVP):**

- [ ] Admin dashboard displays at least 5 key metrics
- [ ] User list shows all users with search, filter, sort, pagination
- [ ] Admin can view any user's profile
- [ ] Admin can edit user's first_name, last_name, email
- [ ] Admin can change user role (student ↔ teacher ↔ admin)
- [ ] Admin can block/unblock users
- [ ] All admin endpoints protected with authorize('admin') middleware
- [ ] Audit log records critical admin actions
- [ ] Frontend displays clear "Admin Panel" indicator in navigation
- [ ] All admin actions require confirmation for destructive operations
- [ ] Admin panel is inaccessible to non-admin users (403 Forbidden)
- [ ] At least 5 automated tests verify RBAC enforcement

---

## ESTIMATED IMPLEMENTATION TIME

| Component | Hours | Priority |
|-----------|-------|----------|
| Admin Dashboard | 8 | P0 |
| User Management (List, View, Edit) | 12 | P0 |
| User Management (Create, Delete, Role) | 8 | P0 |
| RBAC Middleware & Enforcement | 6 | P0 |
| Audit Logging Backend | 6 | P0 |
| Audit Log Viewer Frontend | 4 | P1 |
| Course Management (Admin Override) | 6 | P1 |
| Lesson Management | 8 | P1 |
| Level Management | 4 | P2 |
| System Settings | 4 | P2 |
| Reports & Analytics | 8 | P2 |
| Advanced Security (MFA, etc.) | 10 | P3 |
| **TOTAL** | **84 hours** (~10-11 days) | |

**MVP (P0):** 40 hours (~5 days)  
**Full Implementation (P0-P2):** 64 hours (~8 days)

---

## CONCLUSION

The admin panel is a **critical missing component** that prevents proper platform management. Without it, there is no way to:
- Manage users (block abusive accounts, resolve issues)
- Moderate content (review courses, handle teacher disputes)
- Monitor platform health (detect anomalies, track growth)
- Ensure security (audit administrative actions)

**Recommendation:** Implement Admin Panel MVP (Phase 1) immediately after resolving critical security issues. Do not deploy to production without basic admin functionality.

---

**Document Created:** September 24, 2026  
**Status:** Requirements Defined, Implementation Pending  
**Priority:** HIGH (Required for Production)
