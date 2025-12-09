import { Users, UserCheck, BookOpen, AlertCircle, TrendingUp, Search, Edit, Trash2, Plus, Download } from 'lucide-react';
import { Navbar } from './Navbar';
import { StatCard } from './StatCard';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';
import { Toast } from './Toast';
import { User } from '../App';
import { useState } from 'react';

interface AdminDashboardProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department?: string;
}

interface Program {
  id: string;
  code: string;
  name: string;
  college: string;
  duration: number;
  students: number;
}

interface ShiftingRequest {
  id: string;
  studentId: string;
  studentName: string;
  currentProgram: string;
  requestedProgram: string;
  reason: string;
  date: string;
  gpa: number;
}

interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  type: 'info' | 'warning' | 'error';
}

export function AdminDashboard({ user, currentPage, onNavigate, onLogout }: AdminDashboardProps) {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Dr. Maria Santos', email: 'maria.santos@psu.edu.ph', role: 'Faculty', status: 'Active', department: 'Computer Studies' },
    { id: '2', name: 'Prof. Juan Reyes', email: 'juan.reyes@psu.edu.ph', role: 'Faculty', status: 'Active', department: 'Computer Studies' },
    { id: '3', name: 'Ana Cruz', email: 'ana.cruz@psu.edu.ph', role: 'Registrar', status: 'Active', department: 'Registrar Office' },
    { id: '4', name: 'Mark Gonzales', email: 'mark.gonzales@psu.edu.ph', role: 'Registrar', status: 'Active', department: 'Registrar Office' },
    { id: '5', name: 'Admin User', email: 'admin@psu.edu.ph', role: 'Admin', status: 'Active', department: 'IT Department' },
  ]);

  const [programs, setPrograms] = useState<Program[]>([
    { id: '1', code: 'BSCS', name: 'BS Computer Science', college: 'College of Computer Studies', duration: 4, students: 342 },
    { id: '2', code: 'BSIT', name: 'BS Information Technology', college: 'College of Computer Studies', duration: 4, students: 298 },
    { id: '3', code: 'BSBA', name: 'BS Business Administration', college: 'College of Business Administration', duration: 4, students: 456 },
    { id: '4', code: 'BSP', name: 'BS Psychology', college: 'College of Arts and Sciences', duration: 4, students: 187 },
    { id: '5', code: 'BSCE', name: 'BS Civil Engineering', college: 'College of Engineering', duration: 5, students: 234 },
  ]);

  const [shiftingRequests, setShiftingRequests] = useState<ShiftingRequest[]>([
    { id: '1', studentId: '2024-00123', studentName: 'Carlos Mendoza', currentProgram: 'BS Information Technology', requestedProgram: 'BS Computer Science', reason: 'Better career opportunities in software development', date: '2025-11-20', gpa: 3.2 },
    { id: '2', studentId: '2024-00456', studentName: 'Sophia Torres', currentProgram: 'BS Business Administration', requestedProgram: 'BS Psychology', reason: 'Discovered passion for behavioral science', date: '2025-11-22', gpa: 3.5 },
    { id: '3', studentId: '2024-00789', studentName: 'Miguel Santos', currentProgram: 'BS Civil Engineering', requestedProgram: 'BS Computer Science', reason: 'Interest in technology and programming', date: '2025-11-24', gpa: 3.0 },
  ]);

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    { id: '1', timestamp: '2025-11-26 14:35:22', user: 'admin@psu.edu.ph', action: 'Created Account', details: 'Created faculty account for Dr. Maria Santos', type: 'info' },
    { id: '2', timestamp: '2025-11-26 13:20:15', user: 'registrar@psu.edu.ph', action: 'Approved Enrollment', details: 'Approved enrollment for Juan Dela Cruz (2025-00001)', type: 'info' },
    { id: '3', timestamp: '2025-11-26 12:45:08', user: 'admin@psu.edu.ph', action: 'Updated Curriculum', details: 'Modified BSCS curriculum for 2nd year', type: 'warning' },
    { id: '4', timestamp: '2025-11-26 11:30:42', user: 'faculty@psu.edu.ph', action: 'Submitted Grades', details: 'Submitted final grades for CS 101', type: 'info' },
    { id: '5', timestamp: '2025-11-26 10:15:33', user: 'system', action: 'Database Backup', details: 'Automated database backup completed successfully', type: 'info' },
    { id: '6', timestamp: '2025-11-26 09:05:17', user: 'admin@psu.edu.ph', action: 'Failed Login Attempt', details: 'Multiple failed login attempts detected from IP 192.168.1.100', type: 'error' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'account' | 'program' | 'shifting'>('account');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    code: '',
    programName: '',
    college: '',
    duration: 4
  });

  const handleAddAccount = () => {
    if (!formData.name || !formData.email || !formData.role) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    const newAccount: Account = {
      id: (accounts.length + 1).toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Active',
      department: formData.department
    };

    setAccounts([...accounts, newAccount]);
    setShowModal(false);
    setToast({ message: 'Account created successfully!', type: 'success' });
    resetForm();
  };

  const handleAddProgram = () => {
    if (!formData.code || !formData.programName || !formData.college) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    const newProgram: Program = {
      id: (programs.length + 1).toString(),
      code: formData.code,
      name: formData.programName,
      college: formData.college,
      duration: formData.duration,
      students: 0
    };

    setPrograms([...programs, newProgram]);
    setShowModal(false);
    setToast({ message: 'Program created successfully!', type: 'success' });
    resetForm();
  };

  const handleDelete = () => {
    if (currentPage === 'accounts') {
      setAccounts(accounts.filter(a => a.id !== selectedItem.id));
      setToast({ message: 'Account deleted successfully', type: 'success' });
    } else if (currentPage === 'programs') {
      setPrograms(programs.filter(p => p.id !== selectedItem.id));
      setToast({ message: 'Program deleted successfully', type: 'success' });
    }
    setShowConfirm(false);
    setSelectedItem(null);
  };

  const handleApproveShifting = (id: string) => {
    setShiftingRequests(shiftingRequests.filter(r => r.id !== id));
    setToast({ message: 'Shifting request approved!', type: 'success' });
  };

  const handleRejectShifting = (id: string) => {
    setShiftingRequests(shiftingRequests.filter(r => r.id !== id));
    setToast({ message: 'Shifting request rejected', type: 'info' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      code: '',
      programName: '',
      college: '',
      duration: 4
    });
  };

  const openAddModal = (type: 'account' | 'program') => {
    setModalType(type);
    resetForm();
    setShowModal(true);
  };

  // Accounts Page
  if (currentPage === 'accounts') {
    const filteredAccounts = accounts.filter(account =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Account Management</h2>
            <p className="text-gray-700">Create and manage faculty and registrar accounts</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search accounts..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
              <button 
                onClick={() => openAddModal('account')}
                className="px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: '#D65A1E' }}
              >
                <Plus className="w-5 h-5" />
                Add Account
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Active Accounts ({filteredAccounts.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-gray-700">Department</th>
                    <th className="px-6 py-4 text-left text-gray-700">Status</th>
                    <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{account.name}</td>
                      <td className="px-6 py-4 text-gray-600">{account.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm" style={{ 
                          backgroundColor: account.role === 'Admin' ? '#D65A1E20' : account.role === 'Faculty' ? '#3B82F620' : '#10B98120',
                          color: account.role === 'Admin' ? '#D65A1E' : account.role === 'Faculty' ? '#3B82F6' : '#10B981'
                        }}>
                          {account.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{account.department || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedItem(account);
                              setShowConfirm(true);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Account">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="email@psu.edu.ph"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Role *</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              >
                <option value="">Select Role</option>
                <option value="Faculty">Faculty</option>
                <option value="Registrar">Registrar</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="e.g., Computer Studies"
              />
            </div>
            <button 
              onClick={handleAddAccount}
              className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              Create Account
            </button>
          </div>
        </Modal>

        <ConfirmDialog
          isOpen={showConfirm}
          title="Delete Account"
          message={`Are you sure you want to delete ${selectedItem?.name}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          confirmText="Delete"
          type="danger"
        />

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // Programs Page
  if (currentPage === 'programs') {
    const filteredPrograms = programs.filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.college.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Program Management</h2>
            <p className="text-gray-700">Manage academic programs and offerings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search programs..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
              <button 
                onClick={() => openAddModal('program')}
                className="px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: '#D65A1E' }}
              >
                <Plus className="w-5 h-5" />
                Add Program
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: '#D65A1E20', color: '#D65A1E' }}>
                    {program.code}
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedItem(program);
                        setShowConfirm(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <h3 className="text-gray-900 mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{program.college}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{program.duration} years</span>
                  <span className="text-gray-700">{program.students} students</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Program">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Program Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="e.g., BSCS"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Program Name *</label>
              <input
                type="text"
                value={formData.programName}
                onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">College/Department *</label>
              <select 
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              >
                <option value="">Select College</option>
                <option value="College of Computer Studies">College of Computer Studies</option>
                <option value="College of Business Administration">College of Business Administration</option>
                <option value="College of Arts and Sciences">College of Arts and Sciences</option>
                <option value="College of Engineering">College of Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Duration (Years) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                min="3"
                max="6"
              />
            </div>
            <button 
              onClick={handleAddProgram}
              className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              Create Program
            </button>
          </div>
        </Modal>

        <ConfirmDialog
          isOpen={showConfirm}
          title="Delete Program"
          message={`Are you sure you want to delete ${selectedItem?.name}? This will affect ${selectedItem?.students} students.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          confirmText="Delete"
          type="danger"
        />

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // Shifting Page
  if (currentPage === 'shifting') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Course Shifting Requests</h2>
            <p className="text-gray-700">Review and approve student program transfer requests</p>
          </div>

          <div className="space-y-4">
            {shiftingRequests.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No shifting requests at the moment</p>
              </div>
            ) : (
              shiftingRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{request.studentName}</h3>
                        <span className="text-sm text-gray-500">{request.studentId}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>GPA: <strong>{request.gpa}</strong></span>
                        <span>Submitted: {request.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Program</div>
                      <div className="text-gray-900">{request.currentProgram}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Requested Program</div>
                      <div style={{ color: '#D65A1E' }}>{request.requestedProgram}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Reason for Shifting</div>
                    <p className="text-gray-700">{request.reason}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApproveShifting(request.id)}
                      className="flex-1 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all"
                      style={{ backgroundColor: '#D65A1E' }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectShifting(request.id)}
                      className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // System Logs Page
  if (currentPage === 'system-logs') {
    const filteredLogs = systemLogs.filter(log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">System Logs</h2>
            <p className="text-gray-700">Monitor all system activities and changes</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
              <button 
                className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Logs
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Timestamp</th>
                    <th className="px-6 py-4 text-left text-gray-700">User</th>
                    <th className="px-6 py-4 text-left text-gray-700">Action</th>
                    <th className="px-6 py-4 text-left text-gray-700">Details</th>
                    <th className="px-6 py-4 text-center text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600 text-sm">{log.timestamp}</td>
                      <td className="px-6 py-4 text-gray-900">{log.user}</td>
                      <td className="px-6 py-4 text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{log.details}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          log.type === 'error' ? 'bg-red-100 text-red-700' :
                          log.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Dashboard
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
      <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-700">Here's what's happening with your university system today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Students"
            value="2,847"
            subtitle="↑ 12% from last semester"
          />
          <StatCard
            icon={AlertCircle}
            title="Pending Enrollments"
            value="156"
            subtitle="Requires approval"
            color="#EF4444"
          />
          <StatCard
            icon={UserCheck}
            title="Faculty Accounts"
            value={accounts.filter(a => a.role === 'Faculty').length}
            subtitle="Active members"
            color="#3B82F6"
          />
          <StatCard
            icon={BookOpen}
            title="Active Programs"
            value={programs.length}
            subtitle="Across all colleges"
            color="#10B981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Recent Enrollment Requests</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Juan Dela Cruz', program: 'BS Computer Science', year: '1st Year', date: '2025-11-26' },
                  { name: 'Maria Garcia', program: 'BS Information Technology', year: '2nd Year', date: '2025-11-26' },
                  { name: 'Pedro Reyes', program: 'BS Business Administration', year: '1st Year', date: '2025-11-25' },
                  { name: 'Ana Lopez', program: 'BS Psychology', year: '3rd Year', date: '2025-11-25' },
                ].map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div>
                      <div className="text-gray-900 mb-1">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.program} • {student.year}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{student.date}</span>
                      <button 
                        onClick={() => onNavigate('enrollment-approval')}
                        className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all"
                        style={{ backgroundColor: '#D65A1E' }}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#D65A1E' }} />
                </div>
                <h3 className="text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('accounts')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Create Faculty Account
                </button>
                <button 
                  onClick={() => onNavigate('enrollment-approval')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Approve Enrollments
                </button>
                <button 
                  onClick={() => onNavigate('curriculum-editor')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Edit Curriculum
                </button>
                <button 
                  onClick={() => onNavigate('system-logs')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  System Logs
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-yellow-100">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-gray-900">System Alerts</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-yellow-50 rounded-xl text-yellow-800">
                  <div className="mb-1">Database Backup</div>
                  <div className="text-xs text-yellow-600">Scheduled for tonight at 2:00 AM</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-blue-800">
                  <div className="mb-1">New Updates Available</div>
                  <div className="text-xs text-blue-600">Version 2.5.1 ready to install</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
