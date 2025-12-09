import { User, Mail, Phone, MapPin, Briefcase, Calendar, ArrowLeft } from 'lucide-react';
import { User as UserType } from '../App';

interface ProfilePageProps {
  user: UserType;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onNavigate, onLogout }: ProfilePageProps) {
  const roleDisplayName = user.role === 'admin' ? 'Administrator' : user.role === 'faculty' ? 'Faculty Member' : 'Registrar Staff';

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

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8" style={{ background: 'linear-gradient(135deg, #D65A1E 0%, #E67E40 100%)' }}>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center">
                <User className="w-12 h-12 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-white mb-2">{user.name}</h2>
                <p className="text-orange-100 mb-4">{roleDisplayName}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => onNavigate('settings')}
                    className="px-6 py-2 bg-white text-orange-600 rounded-xl hover:shadow-lg transition-all"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={onLogout}
                    className="px-6 py-2 bg-orange-800 text-white rounded-xl hover:bg-orange-900 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: '#D65A1E' }}>
                <h3 style={{ color: '#D65A1E' }}>Personal Information</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email Address</div>
                    <div className="text-gray-900">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                    <div className="text-gray-900">+63 912 345 6789</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Address</div>
                    <div className="text-gray-900">Palawan State University, Puerto Princesa City, Palawan</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Position</div>
                    <div className="text-gray-900">{roleDisplayName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Member Since</div>
                    <div className="text-gray-900">January 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {user.role === 'faculty' && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: '#D65A1E' }}>
                  <h3 style={{ color: '#D65A1E' }}>Teaching Information</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Department</div>
                    <div className="text-gray-900">College of Computer Studies</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Total Classes</div>
                    <div className="text-gray-900">4 Classes</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Total Students</div>
                    <div className="text-gray-900">143 Students</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-500 mb-1">Office Hours</div>
                    <div className="text-gray-900">MWF 2:00-4:00 PM</div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2" style={{ borderColor: '#D65A1E' }}>
                <h3 style={{ color: '#D65A1E' }}>Account Settings</h3>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('settings')}
                  className="w-full text-left px-6 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700"
                >
                  Change Password
                </button>
                <button className="w-full text-left px-6 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                  Notification Preferences
                </button>
                <button className="w-full text-left px-6 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                  Security Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
