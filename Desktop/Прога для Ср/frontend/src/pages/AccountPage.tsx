import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-slate-400 mt-1">Manage your profile and preferences</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" defaultValue={user?.firstName} />
            <Input label="Last Name" defaultValue={user?.lastName} />
          </div>
          <Input label="Email Address" defaultValue={user?.email} disabled />
          
          <div className="pt-4 flex gap-4">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
          <Button variant="secondary">Update Password</Button>
        </CardContent>
      </Card>

      <div className="pt-6 border-t border-slate-700/50">
        <Button variant="danger" onClick={logout}>Sign out of all devices</Button>
      </div>
    </div>
  );
};
