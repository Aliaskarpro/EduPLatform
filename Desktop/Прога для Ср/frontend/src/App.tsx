import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { AuthGuard } from './components/common/AuthGuard';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { SchedulePage } from './pages/SchedulePage';
import { ClassesPage } from './pages/ClassesPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { NotesPage } from './pages/NotesPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { AccountPage } from './pages/AccountPage';
import { ToastContainer } from './components/ui/Toast';

export default function App() {
  const initAuth = useAuthStore(s => s.initAuth);
  useEffect(() => { initAuth(); }, [initAuth]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        <Route path="/" element={<AuthGuard><MainLayout /></AuthGuard>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="classes/:id" element={<LessonDetailPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
