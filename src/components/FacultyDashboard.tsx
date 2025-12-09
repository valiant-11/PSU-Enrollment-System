import { BookOpen, Users, FileCheck, Download, Search, Calendar, Clock, Plus, UserMinus } from 'lucide-react';
import { Navbar } from './Navbar';
import { StatCard } from './StatCard';
import { Toast } from './Toast';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';
import { User } from '../App';
import { useState } from 'react';

interface FacultyDashboardProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface ClassData {
  code: string;
  name: string;
  schedule: string;
  room: string;
}

interface StudentRecord {
  studentId: string;
  name: string;
  program: string;
  year: string;
}

export function FacultyDashboard({ user, currentPage, onNavigate, onLogout }: FacultyDashboardProps) {
  const [classes] = useState<ClassData[]>([
    { code: 'CS 101', name: 'Introduction to Programming', schedule: 'MWF 8:00-9:30 AM', room: 'CCS Lab 1' },
    { code: 'CS 201', name: 'Data Structures', schedule: 'TTH 10:00-11:30 AM', room: 'CCS Lab 2' },
    { code: 'CS 301', name: 'Database Systems', schedule: 'MWF 1:00-2:30 PM', room: 'CCS Lab 3' },
    { code: 'CS 401', name: 'Software Engineering', schedule: 'TTH 3:00-4:30 PM', room: 'CCS Lab 1' },
  ]);

  // Different student lists for each class
  const [classStudents, setClassStudents] = useState<{ [key: string]: StudentRecord[] }>({
    'CS 101': [
      { studentId: '2025-00001', name: 'Juan Dela Cruz', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00002', name: 'Maria Garcia', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00003', name: 'Pedro Reyes', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00004', name: 'Ana Lopez', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00005', name: 'Carlos Santos', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00006', name: 'Sofia Martinez', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00007', name: 'Luis Gonzales', program: 'BS Computer Science', year: '1st Year' },
      { studentId: '2025-00008', name: 'Elena Ramos', program: 'BS Computer Science', year: '1st Year' },
    ],
    'CS 201': [
      { studentId: '2024-00201', name: 'Miguel Torres', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00202', name: 'Isabella Cruz', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00203', name: 'Diego Fernandez', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00204', name: 'Gabriela Morales', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00205', name: 'Rafael Jimenez', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00206', name: 'Valentina Ruiz', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00207', name: 'Sebastian Mendez', program: 'BS Computer Science', year: '2nd Year' },
      { studentId: '2024-00208', name: 'Camila Ortiz', program: 'BS Computer Science', year: '2nd Year' },
    ],
    'CS 301': [
      { studentId: '2023-00301', name: 'Nicolas Rivera', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00302', name: 'Victoria Herrera', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00303', name: 'Mateo Castro', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00304', name: 'Lucia Vargas', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00305', name: 'Santiago Romero', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00306', name: 'Emilia Navarro', program: 'BS Computer Science', year: '3rd Year' },
      { studentId: '2023-00307', name: 'Leonardo Guzman', program: 'BS Computer Science', year: '3rd Year' },
    ],
    'CS 401': [
      { studentId: '2022-00401', name: 'Benjamin Castillo', program: 'BS Computer Science', year: '4th Year' },
      { studentId: '2022-00402', name: 'Martina Delgado', program: 'BS Computer Science', year: '4th Year' },
      { studentId: '2022-00403', name: 'Alejandro Peña', program: 'BS Computer Science', year: '4th Year' },
      { studentId: '2022-00404', name: 'Renata Soto', program: 'BS Computer Science', year: '4th Year' },
      { studentId: '2022-00405', name: 'Daniel Aguilar', program: 'BS Computer Science', year: '4th Year' },
      { studentId: '2022-00406', name: 'Carolina Medina', program: 'BS Computer Science', year: '4th Year' },
    ],
  });

  const [selectedClass, setSelectedClass] = useState('CS 101');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<StudentRecord | null>(null);
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentYear, setNewStudentYear] = useState('');

  const handleDownloadClassList = (classCode: string) => {
    setToast({ message: `Downloading class list for ${classCode}...`, type: 'success' });
  };

  const handleAddStudent = () => {
    if (!newStudentId || !newStudentName || !newStudentYear) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    const newStudent: StudentRecord = {
      studentId: newStudentId,
      name: newStudentName,
      program: 'BS Computer Science',
      year: newStudentYear
    };

    setClassStudents({
      ...classStudents,
      [selectedClass]: [...(classStudents[selectedClass] || []), newStudent]
    });

    setShowAddModal(false);
    setToast({ message: `${newStudentName} added to ${selectedClass}`, type: 'success' });
    setNewStudentId('');
    setNewStudentName('');
    setNewStudentYear('');
  };

  const handleRemoveStudent = () => {
    if (!studentToRemove) return;

    setClassStudents({
      ...classStudents,
      [selectedClass]: classStudents[selectedClass].filter(s => s.studentId !== studentToRemove.studentId)
    });

    setToast({ message: `${studentToRemove.name} removed from ${selectedClass}`, type: 'success' });
    setShowRemoveConfirm(false);
    setStudentToRemove(null);
  };

  // Classes Page
  if (currentPage === 'classes') {
    const currentStudents = classStudents[selectedClass] || [];
    const filteredStudents = currentStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm)
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">My Classes</h2>
            <p className="text-gray-700">Manage your class schedules and student lists</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {classes.map((classItem, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedClass(classItem.code)}
                className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all cursor-pointer ${
                  selectedClass === classItem.code ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{ 
                  ringColor: selectedClass === classItem.code ? '#D65A1E' : 'transparent'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="px-3 py-1 rounded-lg text-sm inline-block mb-2" style={{ backgroundColor: '#D65A1E20', color: '#D65A1E' }}>
                      {classItem.code}
                    </div>
                    <h3 className="text-gray-900 mb-1">{classItem.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{classStudents[classItem.code]?.length || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{classItem.room}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('grade-input');
                    }}
                    className="flex-1 px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all"
                    style={{ backgroundColor: '#D65A1E' }}
                  >
                    Input Grades
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Class Student List */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">Class List - {selectedClass}</h3>
                <p className="text-sm text-gray-600">{currentStudents.length} students enrolled</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  style={{ backgroundColor: '#D65A1E' }}
                >
                  <Plus className="w-4 h-4" />
                  Add Student
                </button>
                <button 
                  onClick={() => handleDownloadClassList(selectedClass)}
                  className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export List
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search students..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Student ID</th>
                    <th className="px-6 py-4 text-left text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-gray-700">Program</th>
                    <th className="px-6 py-4 text-left text-gray-700">Year</th>
                    <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, idx) => (
                      <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900">{student.studentId}</td>
                        <td className="px-6 py-4 text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-gray-600">{student.program}</td>
                        <td className="px-6 py-4 text-gray-600">{student.year}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => {
                              setStudentToRemove(student);
                              setShowRemoveConfirm(true);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          >
                            <UserMinus className="w-4 h-4" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Student Modal */}
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={`Add Student to ${selectedClass}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Student ID *</label>
              <input
                type="text"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="e.g., 2025-00009"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Student Name *</label>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Year Level *</label>
              <select 
                value={newStudentYear}
                onChange={(e) => setNewStudentYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <button 
              onClick={handleAddStudent}
              className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              Add Student to Class
            </button>
          </div>
        </Modal>

        {/* Remove Student Confirmation */}
        <ConfirmDialog
          isOpen={showRemoveConfirm}
          title="Remove Student from Class"
          message={`Are you sure you want to remove ${studentToRemove?.name} from ${selectedClass}? This action cannot be undone.`}
          onConfirm={handleRemoveStudent}
          onCancel={() => {
            setShowRemoveConfirm(false);
            setStudentToRemove(null);
          }}
          confirmText="Remove"
          type="danger"
        />

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // Grades Page
  if (currentPage === 'grades') {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Grade Management</h2>
            <p className="text-gray-700">View and manage student grades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {classes.map((classItem) => (
              <div 
                key={classItem.code}
                onClick={() => onNavigate('grade-input')}
                className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="px-3 py-1 rounded-lg text-sm inline-block mb-3" style={{ backgroundColor: '#D65A1E20', color: '#D65A1E' }}>
                  {classItem.code}
                </div>
                <h3 className="text-gray-900 mb-2">{classItem.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{classStudents[classItem.code]?.length || 0} students</span>
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('grade-input');
                    }}
                  >
                    Input Grades →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-gray-900 mb-4">Grade Submission Status</h3>
            <div className="space-y-3">
              {classes.map((classItem, idx) => {
                const progress = Math.floor(Math.random() * 100);
                const isComplete = progress === 100;
                
                return (
                  <div key={idx} className="p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">{classItem.code} - {classItem.name}</span>
                      <span className="text-sm" style={{ color: isComplete ? '#10B981' : '#D65A1E' }}>
                        {progress}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all" 
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: isComplete ? '#10B981' : '#D65A1E'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
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
          <h2 className="text-gray-900 mb-2">Welcome, Professor {user.name}!</h2>
          <p className="text-gray-700">Here's an overview of your teaching activities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Classes Today"
            value="3"
            subtitle="2 morning, 1 afternoon"
          />
          <StatCard
            icon={Users}
            title="Total Students"
            value={Object.values(classStudents).reduce((acc, students) => acc + students.length, 0).toString()}
            subtitle="Across all classes"
            color="#3B82F6"
          />
          <StatCard
            icon={FileCheck}
            title="Pending Grades"
            value="12"
            subtitle="Submissions required"
            color="#EF4444"
          />
          <StatCard
            icon={Download}
            title="Classes"
            value={classes.length.toString()}
            subtitle="This semester"
            color="#10B981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Today's Schedule</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { time: '8:00 - 9:30 AM', code: 'CS 101', name: 'Introduction to Programming', room: 'CCS Lab 1', students: classStudents['CS 101']?.length || 0 },
                  { time: '10:00 - 11:30 AM', code: 'CS 201', name: 'Data Structures', room: 'CCS Lab 2', students: classStudents['CS 201']?.length || 0 },
                  { time: '1:00 - 2:30 PM', code: 'CS 301', name: 'Database Systems', room: 'CCS Lab 3', students: classStudents['CS 301']?.length || 0 },
                ].map((schedule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Time</div>
                        <div className="text-gray-900">{schedule.time}</div>
                      </div>
                      <div className="h-12 w-px bg-gray-200"></div>
                      <div>
                        <div className="text-gray-900 mb-1">{schedule.code} - {schedule.name}</div>
                        <div className="text-sm text-gray-600">{schedule.room} • {schedule.students} students</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedClass(schedule.code);
                        onNavigate('classes');
                      }}
                      className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all"
                      style={{ backgroundColor: '#D65A1E' }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                  <Users className="w-5 h-5" style={{ color: '#D65A1E' }} />
                </div>
                <h3 className="text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('grade-input')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Input Grades
                </button>
                <button 
                  onClick={() => onNavigate('classes')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Manage Class Lists
                </button>
                <button 
                  onClick={() => onNavigate('grades')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Student Performance
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Grade Submission Deadline</h3>
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                <div className="mb-2" style={{ color: '#D65A1E' }}>December 15, 2025</div>
                <div className="text-sm text-gray-600">13 days remaining</div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please ensure all midterm grades are submitted before the deadline.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Permissions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Input student grades</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">View class lists</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Add/Remove students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">View billing (restricted)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Edit tuition (restricted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
