import { ArrowLeft, Save, Upload, Download, Search } from 'lucide-react';
import { User } from '../App';
import { useState } from 'react';

interface GradeInputProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function GradeInput({ user, onNavigate }: GradeInputProps) {
  const [selectedClass, setSelectedClass] = useState('CS 101');
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    { code: 'CS 101', name: 'Introduction to Programming', students: 42 },
    { code: 'CS 201', name: 'Data Structures', students: 38 },
    { code: 'CS 301', name: 'Database Systems', students: 35 },
    { code: 'CS 401', name: 'Software Engineering', students: 28 },
  ];

  const students = [
    { id: '2025-00001', name: 'Juan Dela Cruz', midterm: 85, finals: 0, average: 0 },
    { id: '2025-00002', name: 'Maria Garcia', midterm: 92, finals: 0, average: 0 },
    { id: '2024-00856', name: 'Pedro Reyes', midterm: 78, finals: 0, average: 0 },
    { id: '2024-00723', name: 'Ana Lopez', midterm: 88, finals: 0, average: 0 },
    { id: '2024-00645', name: 'Carlos Santos', midterm: 91, finals: 0, average: 0 },
    { id: '2024-00598', name: 'Sofia Martinez', midterm: 0, finals: 0, average: 0 },
    { id: '2024-00512', name: 'Luis Gonzales', midterm: 86, finals: 0, average: 0 },
    { id: '2024-00487', name: 'Elena Ramos', midterm: 94, finals: 0, average: 0 },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
      <div className="max-w-7xl mx-auto p-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-gray-800 mb-6 hover:text-gray-900 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">Grade Input Module</h2>
          <p className="text-gray-700">Input and manage student grades</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-gray-900 mb-4">Select Class</h3>
            <div className="space-y-2">
              {classes.map((classItem) => (
                <button
                  key={classItem.code}
                  onClick={() => setSelectedClass(classItem.code)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedClass === classItem.code
                      ? 'text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  style={selectedClass === classItem.code ? { backgroundColor: '#D65A1E' } : {}}
                >
                  <div className="mb-1">{classItem.code}</div>
                  <div className="text-sm opacity-80">{classItem.name}</div>
                  <div className="text-xs opacity-70 mt-1">{classItem.students} students</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">{selectedClass} - Introduction to Programming</h3>
                  <p className="text-sm text-gray-600">Midterm & Finals Grade Entry</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">
                    <Upload className="w-4 h-4" />
                    Import CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or student ID..."
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
                      <th className="px-6 py-4 text-center text-gray-700">Midterm</th>
                      <th className="px-6 py-4 text-center text-gray-700">Finals</th>
                      <th className="px-6 py-4 text-center text-gray-700">Average</th>
                      <th className="px-6 py-4 text-center text-gray-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => {
                      const average = student.midterm && student.finals
                        ? ((student.midterm + student.finals) / 2).toFixed(2)
                        : student.midterm || student.finals || 0;
                      
                      let grade = '';
                      const avgNum = Number(average);
                      if (avgNum >= 90) grade = '1.0';
                      else if (avgNum >= 85) grade = '1.5';
                      else if (avgNum >= 80) grade = '2.0';
                      else if (avgNum >= 75) grade = '2.5';
                      else if (avgNum >= 70) grade = '3.0';
                      else if (avgNum >= 60) grade = '4.0';
                      else if (avgNum > 0) grade = '5.0';

                      return (
                        <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-900">{student.id}</td>
                          <td className="px-6 py-4 text-gray-900">{student.name}</td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              defaultValue={student.midterm || ''}
                              min="0"
                              max="100"
                              className="w-20 px-3 py-2 text-center rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              defaultValue={student.finals || ''}
                              min="0"
                              max="100"
                              className="w-20 px-3 py-2 text-center rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-4 text-center text-gray-900">{average || '-'}</td>
                          <td className="px-6 py-4 text-center">
                            {grade ? (
                              <span
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                  backgroundColor: grade === '5.0' ? '#EF444420' : '#10B98120',
                                  color: grade === '5.0' ? '#EF4444' : '#10B981'
                                }}
                              >
                                {grade}
                              </span>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {filteredStudents.length} of {students.length} students
                </div>
                <button
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: '#D65A1E' }}
                >
                  <Save className="w-5 h-5" />
                  Save Grades
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Grade Submission Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: '#D65A1E' }}></div>
                  <p>Grades must be between 0-100. The system will automatically convert to GPA scale (1.0-5.0).</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: '#D65A1E' }}></div>
                  <p>Final average is calculated as: (Midterm + Finals) / 2</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: '#D65A1E' }}></div>
                  <p>Grades can be edited before the deadline: December 15, 2025</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: '#D65A1E' }}></div>
                  <p>You can import grades via CSV file. Download the template first.</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                <div className="mb-2" style={{ color: '#D65A1E' }}>Grading Scale</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <div>90-100 = 1.0 (Excellent)</div>
                  <div>85-89 = 1.5 (Very Good)</div>
                  <div>80-84 = 2.0 (Good)</div>
                  <div>75-79 = 2.5 (Satisfactory)</div>
                  <div>70-74 = 3.0 (Fair)</div>
                  <div>60-69 = 4.0 (Passing)</div>
                  <div>Below 60 = 5.0 (Failed)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
