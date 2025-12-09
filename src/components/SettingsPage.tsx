import { ArrowLeft, Lock, Bell, Shield, Eye, EyeOff } from 'lucide-react';
import { User } from '../App';
import { useState } from 'react';

interface SettingsPageProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SettingsPage({ user, onNavigate }: SettingsPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-gray-800 mb-6 hover:text-gray-900 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <h2 className="text-gray-900 mb-8">Settings</h2>

        <div className="space-y-6">
          {/* Password Settings */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" style={{ color: '#D65A1E' }} />
                <h3 style={{ color: '#D65A1E' }}>Change Password</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">New Password *</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm New Password *</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                    placeholder="Confirm new password"
                  />
                </div>

                <button 
                  className="px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#D65A1E' }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#D65A1E' }} />
                <h3 style={{ color: '#D65A1E' }}>Notification Preferences</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-gray-900 mb-1">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive updates and alerts via email</div>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                        emailNotifications ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-gray-900 mb-1">SMS Notifications</div>
                    <div className="text-sm text-gray-600">Receive urgent alerts via SMS</div>
                  </div>
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      smsNotifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                        smsNotifications ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-gray-900 mb-1">Enrollment Updates</div>
                    <div className="text-sm text-gray-600">Get notified about enrollment changes</div>
                  </div>
                  <button
                    className="relative w-14 h-7 rounded-full transition-all bg-green-500"
                  >
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-gray-900 mb-1">System Maintenance</div>
                    <div className="text-sm text-gray-600">Alerts about scheduled maintenance</div>
                  </div>
                  <button
                    className="relative w-14 h-7 rounded-full transition-all bg-green-500"
                  >
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" style={{ color: '#D65A1E' }} />
                <h3 style={{ color: '#D65A1E' }}>Security Settings</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-gray-900 mb-1">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                  </div>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                        twoFactorAuth ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-900 mb-2">Active Sessions</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current session (This device)</span>
                      <span className="text-green-600">Active now</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-gray-900 mb-2">Login History</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Last login: November 26, 2025 at 9:15 AM</div>
                    <div>IP Address: 192.168.1.1</div>
                    <div>Location: Puerto Princesa City, Palawan</div>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all">
                  Logout All Other Sessions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
