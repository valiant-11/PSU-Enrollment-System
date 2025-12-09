import { GraduationCap, User, Settings, LogOut } from 'lucide-react';
import { UserRole } from '../App';

interface NavbarProps {
  userRole: UserRole;
  userName: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ userRole, userName, currentPage, onNavigate, onLogout }: NavbarProps) {
  const adminPages = ['Dashboard', 'Accounts', 'Programs', 'Enrollment', 'Shifting', 'Curriculum', 'System Logs'];
  const facultyPages = ['Dashboard', 'Classes', 'Grades'];
  const registrarPages = ['Dashboard', 'Students', 'Programs', 'Subjects', 'Enrollment'];

  let pages: string[] = [];
  let portalTitle = '';

  switch (userRole) {
    case 'admin':
      pages = adminPages;
      portalTitle = 'Admin Portal';
      break;
    case 'faculty':
      pages = facultyPages;
      portalTitle = 'Faculty Portal';
      break;
    case 'registrar':
      pages = registrarPages;
      portalTitle = 'Registrar Portal';
      break;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#D65A1E' }}>
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-orange-800">PSU Enrollment System</h1>
              <p className="text-sm text-orange-600">{portalTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{userName}</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 rounded-xl hover:bg-gray-50 transition-all"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {pages.map((page) => {
            const pageKey = page.toLowerCase().replace(' ', '-');
            const isActive = currentPage === 'dashboard' && page === 'Dashboard' || currentPage === pageKey;
            
            return (
              <button
                key={page}
                onClick={() => onNavigate(page === 'Dashboard' ? 'dashboard' : pageKey)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#D65A1E' } : {}}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
