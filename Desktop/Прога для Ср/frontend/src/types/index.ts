// ==================== USER ====================
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: 'student' | 'teacher' | 'admin';
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  createdAt: string;
}

// ==================== LEVEL ====================
export interface Level {
  id: string;
  name: string;
  code: string;
  description: string;
  orderIndex: number;
  minLessonsRequired: number;
}

export interface UserProgress {
  levelId: string;
  levelName: string;
  levelCode: string;
  completedLessons: number;
  totalStudyTime: number;
  currentXp: number;
  progressPercent: number;
  nextLevel?: Level;
}

// ==================== COURSE ====================
export interface Course {
  id: string;
  title: string;
  description: string;
  levelId: string;
  levelName?: string;
  totalLessons: number;
  coverImage?: string;
  isPublished: boolean;
  completedLessons?: number;
}

// ==================== LESSON ====================
export type LessonStatus = 'planned' | 'in_progress' | 'completed' | 'missed';

export interface Material {
  type: 'pdf' | 'video' | 'link' | 'doc';
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  courseTitle?: string;
  title: string;
  description: string;
  content: string;
  durationMinutes: number;
  orderIndex: number;
  materials?: Material[];
  homework?: string;
  status?: LessonStatus;
  completedAt?: string;
}

// ==================== SCHEDULE ====================
export type ScheduleStatus = 'planned' | 'in_progress' | 'completed' | 'missed' | 'cancelled';
export type LessonType = 'lesson' | 'exam' | 'consultation' | 'self_study';

export interface ScheduleEntry {
  id: string;
  userId: string;
  lessonId?: string;
  title: string;
  description?: string;
  teacherName?: string;
  levelId?: string;
  levelName?: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingUrl?: string;
  lessonType: LessonType;
  status: ScheduleStatus;
  color?: string;
}

// ==================== NOTE ====================
export interface Note {
  id: string;
  userId: string;
  scheduleId?: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== STATISTICS ====================
export interface WeeklyData {
  week: string;
  completed: number;
  missed: number;
  planned: number;
}

export interface MonthlyData {
  month: string;
  completed: number;
  missed: number;
  planned: number;
}

export interface Statistics {
  totalLessons: number;
  completedLessons: number;
  missedLessons: number;
  plannedLessons: number;
  completionRate: number;
  totalStudyTime: number;
  currentXp: number;
  levelName: string;
  levelCode: string;
  nextLevelName?: string;
  nextLevelRequired?: number;
  weeklyData: WeeklyData[];
  monthlyData: MonthlyData[];
}

// ==================== API ====================
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ==================== UI ====================
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ==================== FORM TYPES ====================
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ScheduleForm {
  title: string;
  description?: string;
  teacherName?: string;
  startTime: string;
  endTime: string;
  lessonType: LessonType;
  status: ScheduleStatus;
  location?: string;
  meetingUrl?: string;
  color?: string;
}

export interface NoteForm {
  title: string;
  content: string;
  category?: string;
  tags: string[];
  isPinned: boolean;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
