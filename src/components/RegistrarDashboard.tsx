import { UserPlus, BookOpen, GraduationCap, FileCheck, Calendar, TrendingUp, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Navbar } from './Navbar';
import { StatCard } from './StatCard';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';
import { Toast } from './Toast';
import { User } from '../App';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface RegistrarDashboardProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  program: string;
  year: string;
  email: string;
  phone: string;
  status: string;
}

interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
  type: string;
  program: string;
  yearLevel: string;
  semester: string;
}

export function RegistrarDashboard({ user, currentPage, onNavigate, onLogout }: RegistrarDashboardProps) {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', studentId: '2025-00001', name: 'Juan Dela Cruz', program: 'BS Computer Science', year: '1st Year', email: 'juan.delacruz@psu.edu.ph', phone: '+63 912 345 6789', status: 'Active' },
    { id: '2', studentId: '2025-00002', name: 'Maria Garcia', program: 'BS Information Technology', year: '2nd Year', email: 'maria.garcia@psu.edu.ph', phone: '+63 923 456 7890', status: 'Active' },
    { id: '3', studentId: '2025-00003', name: 'Pedro Reyes', program: 'BS Business Administration', year: '1st Year', email: 'pedro.reyes@psu.edu.ph', phone: '+63 934 567 8901', status: 'Active' },
    { id: '4', studentId: '2024-00856', name: 'Ana Lopez', program: 'BS Psychology', year: '3rd Year', email: 'ana.lopez@psu.edu.ph', phone: '+63 945 678 9012', status: 'Active' },
    { id: '5', studentId: '2024-00723', name: 'Carlos Santos', program: 'BS Computer Science', year: '2nd Year', email: 'carlos.santos@psu.edu.ph', phone: '+63 956 789 0123', status: 'Active' },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  const [programs] = useState([
    { code: 'BSCS', name: 'BS Computer Science', college: 'College of Computer Studies', students: 342 },
    { code: 'BSIT', name: 'BS Information Technology', college: 'College of Computer Studies', students: 298 },
    { code: 'BSBA', name: 'BS Business Administration', college: 'College of Business Administration', students: 456 },
    { code: 'BSP', name: 'BS Psychology', college: 'College of Arts and Sciences', students: 187 },
    { code: 'BSCE', name: 'BS Civil Engineering', college: 'College of Engineering', students: 234 },
    { code: 'BSEE', name: 'BS Electrical Engineering', college: 'College of Engineering', students: 198 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'student' | 'subject'>('student');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    program: '',
    year: '',
    email: '',
    phone: '',
    code: '',
    subjectName: '',
    units: 3,
    type: '',
    subjectProgram: '',
    yearLevel: '',
    semester: '',
    schedule: 'TBA',
    instructor: 'TBA',
    college: 'TBA'
  });

  // Load subjects from Supabase on component mount
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      console.log('Loading subjects from Supabase...');
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('code', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Loaded subjects:', data);
      
      // Map database format to component format
      const mappedSubjects = (data || []).map(s => ({
        id: s.id,
        code: s.code,
        name: s.description,
        units: s.units,
        type: s.type,
        program: s.course,
        yearLevel: s.year_level,
        semester: s.semester
      }));
      
      setSubjects(mappedSubjects);
      console.log('Mapped subjects:', mappedSubjects.length);
    } catch (error) {
      console.error('Error loading subjects:', error);
      setToast({ message: 'Failed to load subjects', type: 'error' });
    }
  };

  const handleAddStudent = () => {
    if (!formData.studentId || !formData.name || !formData.program || !formData.year) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    const newStudent: Student = {
      id: (students.length + 1).toString(),
      studentId: formData.studentId,
      name: formData.name,
      program: formData.program,
      year: formData.year,
      email: formData.email,
      phone: formData.phone,
      status: 'Active'
    };

    setStudents([...students, newStudent]);
    setShowModal(false);
    setToast({ message: 'Student added successfully!', type: 'success' });
    resetForm();
  };

  const handleAddSubject = async () => {
    if (!formData.code || !formData.subjectName || !formData.type) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subjects')
        .insert([{
          code: formData.code,
          description: formData.subjectName,
          units: formData.units,
          schedule: formData.schedule || 'TBA',
          instructor: formData.instructor || 'TBA',
          slots: 0,
          max_slots: 40,
          type: formData.type,
          college: formData.college || 'TBA',
          course: formData.subjectProgram || 'All',
          year_level: formData.yearLevel || '1',
          semester: formData.semester || '1st Semester'
        }])
        .select()
        .single();

      if (error) throw error;

      setShowModal(false);
      setToast({ message: 'Subject added successfully!', type: 'success' });
      loadSubjects(); // Refresh list
      resetForm();
    } catch (error) {
      console.error('Error adding subject:', error);
      setToast({ message: 'Failed to add subject', type: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      if (currentPage === 'subjects') {
        const { error } = await supabase
          .from('subjects')
          .delete()
          .eq('id', selectedItem.id);

        if (error) throw error;

        setToast({ message: 'Subject deleted', type: 'success' });
        loadSubjects(); // Refresh list
      } else if (currentPage === 'students') {
        setStudents(students.filter(s => s.id !== selectedItem.id));
        setToast({ message: 'Student record deleted', type: 'success' });
      }
      
      setShowConfirm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Delete error:', error);
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const handleChangeYearLevel = (studentId: string) => {
    setToast({ message: 'Year level updated successfully', type: 'success' });
  };

  const resetForm = () => {
    setFormData({
      studentId: '',
      name: '',
      program: '',
      year: '',
      email: '',
      phone: '',
      code: '',
      subjectName: '',
      units: 3,
      type: '',
      subjectProgram: '',
      yearLevel: '',
      semester: '',
      schedule: 'TBA',
      instructor: 'TBA',
      college: 'TBA'
    });
  };

  const openAddModal = (type: 'student' | 'subject') => {
    setModalType(type);
    resetForm();
    setShowModal(true);
  };

  // Students Page
  if (currentPage === 'students') {
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Student Management</h2>
            <p className="text-gray-700">Add and manage student records</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search students..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
              <button 
                onClick={() => openAddModal('student')}
                className="px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: '#D65A1E' }}
              >
                <Plus className="w-5 h-5" />
                Add Student
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Student Records ({filteredStudents.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Student ID</th>
                    <th className="px-6 py-4 text-left text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-gray-700">Program</th>
                    <th className="px-6 py-4 text-left text-gray-700">Year Level</th>
                    <th className="px-6 py-4 text-left text-gray-700">Status</th>
                    <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{student.studentId}</td>
                      <td className="px-6 py-4 text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 text-gray-600">{student.program}</td>
                      <td className="px-6 py-4 text-gray-600">{student.year}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleChangeYearLevel(student.id)}
                            className="text-orange-600 hover:text-orange-800 text-sm"
                          >
                            Change Level
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedItem(student);
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Student">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Student ID *</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  placeholder="2025-00001"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  placeholder="Juan Dela Cruz"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Program *</label>
                <select 
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Program</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Information Technology">BS Information Technology</option>
                  <option value="BS Business Administration">BS Business Administration</option>
                  <option value="BS Psychology">BS Psychology</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Year Level *</label>
                <select 
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="student@psu.edu.ph"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="+63 912 345 6789"
              />
            </div>
            <button 
              onClick={handleAddStudent}
              className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              Add Student
            </button>
          </div>
        </Modal>

        <ConfirmDialog
          isOpen={showConfirm}
          title="Delete Student Record"
          message={`Are you sure you want to delete ${selectedItem?.name}'s record? This action cannot be undone.`}
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
      program.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Program Management</h2>
            <p className="text-gray-700">View and manage academic programs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: '#D65A1E20', color: '#D65A1E' }}>
                    {program.code}
                  </div>
                </div>
                <h3 className="text-gray-900 mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{program.college}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{program.students} students</span>
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Subjects Page
  if (currentPage === 'subjects') {
    const filteredSubjects = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
        <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
        
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Subject Management</h2>
            <p className="text-gray-700">Add and manage course subjects</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search subjects..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                />
              </div>
              <button 
                onClick={() => openAddModal('subject')}
                className="px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: '#D65A1E' }}
              >
                <Plus className="w-5 h-5" />
                Add Subject
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Subject List ({filteredSubjects.length})</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Code</th>
                    <th className="px-6 py-4 text-left text-gray-700">Subject Name</th>
                    <th className="px-6 py-4 text-center text-gray-700">Units</th>
                    <th className="px-6 py-4 text-center text-gray-700">Type</th>
                    <th className="px-6 py-4 text-left text-gray-700">Program</th>
                    <th className="px-6 py-4 text-center text-gray-700">Year/Sem</th>
                    <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject) => (
                    <tr key={subject.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{subject.code}</td>
                      <td className="px-6 py-4 text-gray-900">{subject.name}</td>
                      <td className="px-6 py-4 text-center text-gray-900">{subject.units}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          subject.type === 'Major' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {subject.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{subject.program}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{subject.yearLevel} / {subject.semester}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedItem(subject);
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Subject">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Subject Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  placeholder="CS 101"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Units *</label>
                <input
                  type="number"
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  min="1"
                  max="6"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Subject Name *</label>
              <input
                type="text"
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                placeholder="Introduction to Programming"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Type *</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Type</option>
                  <option value="Major">Major</option>
                  <option value="GE">General Education</option>
                  <option value="Core">Core</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Program</label>
                <select 
                  value={formData.subjectProgram}
                  onChange={(e) => setFormData({ ...formData, subjectProgram: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Program</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Information Technology">BS Information Technology</option>
                  <option value="All">All Programs</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Year Level</label>
                <select 
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Semester</label>
                <select 
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                >
                  <option value="">Select Semester</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleAddSubject}
              className="w-full py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              Add Subject
            </button>
          </div>
        </Modal>

        <ConfirmDialog
          isOpen={showConfirm}
          title="Delete Subject"
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

  // Default Dashboard
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
      <Navbar userRole={user.role} userName={user.name} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-700">Registrar Portal - Manage students, programs, and enrollments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={UserPlus}
            title="New Students"
            value="87"
            subtitle="This semester"
          />
          <StatCard
            icon={GraduationCap}
            title="Programs Offered"
            value={programs.length.toString()}
            subtitle="Active programs"
            color="#3B82F6"
          />
          <StatCard
            icon={FileCheck}
            title="Enrollment Requests"
            value="156"
            subtitle="Pending approval"
            color="#EF4444"
          />
          <StatCard
            icon={Calendar}
            title="Subjects"
            value={subjects.length.toString()}
            subtitle="This semester"
            color="#10B981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
              <h3 style={{ color: '#D65A1E' }}>Recent Enrollment Requests</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Juan Dela Cruz', id: '2025-00001', program: 'BS Computer Science', year: '1st Year', date: '2025-11-26', units: 21 },
                  { name: 'Maria Garcia', id: '2025-00002', program: 'BS Information Technology', year: '2nd Year', date: '2025-11-26', units: 24 },
                  { name: 'Pedro Reyes', id: '2025-00003', program: 'BS Business Administration', year: '1st Year', date: '2025-11-25', units: 21 },
                  { name: 'Ana Lopez', id: '2024-00856', program: 'BS Psychology', year: '3rd Year', date: '2025-11-25', units: 18 },
                ].map((request, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all">
                    <div>
                      <div className="text-gray-900 mb-1">{request.name} • {request.id}</div>
                      <div className="text-sm text-gray-600">{request.program} • {request.year} • {request.units} units</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{request.date}</span>
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
                  onClick={() => onNavigate('students')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Add Student
                </button>
                <button 
                  onClick={() => onNavigate('programs')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  View Programs
                </button>
                <button 
                  onClick={() => onNavigate('subjects')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Add Subjects
                </button>
                <button 
                  onClick={() => onNavigate('enrollment-approval')}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-gray-700"
                >
                  Approve Enrollments
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Enrollment Period</h3>
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                <div className="mb-2" style={{ color: '#D65A1E' }}>December 1-15, 2025</div>
                <div className="text-sm text-gray-600">5 days remaining</div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Second semester enrollment period is currently active.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Permissions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Add students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Add programs/subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Approve enrollment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">Change year levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Edit grades (restricted)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Financial accounts (restricted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
