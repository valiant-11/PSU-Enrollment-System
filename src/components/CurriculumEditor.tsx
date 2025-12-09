import { ArrowLeft, Plus, Edit, Trash2, Save, BookOpen } from 'lucide-react';
import { User } from '../App';
import { useState } from 'react';

interface CurriculumEditorProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function CurriculumEditor({ user, onNavigate }: CurriculumEditorProps) {
  const [selectedProgram, setSelectedProgram] = useState('BSCS');
  const [selectedYear, setSelectedYear] = useState('1');

  const programs = [
    { code: 'BSCS', name: 'BS Computer Science' },
    { code: 'BSIT', name: 'BS Information Technology' },
    { code: 'BSBA', name: 'BS Business Administration' },
    { code: 'BSP', name: 'BS Psychology' },
  ];

  const curriculum = {
    '1': {
      'First Semester': [
        { code: 'CS 101', name: 'Introduction to Programming', units: 3, type: 'Major', prereq: 'None' },
        { code: 'MATH 101', name: 'Calculus I', units: 3, type: 'Major', prereq: 'None' },
        { code: 'ENG 101', name: 'English Communication', units: 3, type: 'GE', prereq: 'None' },
        { code: 'PE 101', name: 'Physical Education 1', units: 2, type: 'GE', prereq: 'None' },
        { code: 'NSTP 101', name: 'NSTP 1', units: 3, type: 'GE', prereq: 'None' },
        { code: 'HIST 101', name: 'Philippine History', units: 3, type: 'GE', prereq: 'None' },
      ],
      'Second Semester': [
        { code: 'CS 102', name: 'Data Structures', units: 3, type: 'Major', prereq: 'CS 101' },
        { code: 'MATH 102', name: 'Calculus II', units: 3, type: 'Major', prereq: 'MATH 101' },
        { code: 'ENG 102', name: 'Technical Writing', units: 3, type: 'GE', prereq: 'ENG 101' },
        { code: 'PE 102', name: 'Physical Education 2', units: 2, type: 'GE', prereq: 'PE 101' },
        { code: 'NSTP 102', name: 'NSTP 2', units: 3, type: 'GE', prereq: 'NSTP 101' },
        { code: 'SCI 101', name: 'General Science', units: 4, type: 'GE', prereq: 'None' },
      ],
    },
    '2': {
      'First Semester': [
        { code: 'CS 201', name: 'Object-Oriented Programming', units: 3, type: 'Major', prereq: 'CS 102' },
        { code: 'CS 202', name: 'Computer Organization', units: 3, type: 'Major', prereq: 'CS 101' },
        { code: 'MATH 201', name: 'Discrete Mathematics', units: 3, type: 'Major', prereq: 'MATH 102' },
        { code: 'STAT 201', name: 'Statistics', units: 3, type: 'Major', prereq: 'MATH 102' },
        { code: 'HUM 201', name: 'Humanities', units: 3, type: 'GE', prereq: 'None' },
      ],
      'Second Semester': [
        { code: 'CS 203', name: 'Database Systems', units: 3, type: 'Major', prereq: 'CS 102' },
        { code: 'CS 204', name: 'Web Development', units: 3, type: 'Major', prereq: 'CS 201' },
        { code: 'CS 205', name: 'Software Engineering', units: 3, type: 'Major', prereq: 'CS 201' },
        { code: 'MATH 202', name: 'Linear Algebra', units: 3, type: 'Major', prereq: 'MATH 201' },
        { code: 'SOC 201', name: 'Society and Culture', units: 3, type: 'GE', prereq: 'None' },
      ],
    },
  };

  const currentCurriculum = curriculum[selectedYear as keyof typeof curriculum] || {};

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
          <h2 className="text-gray-900 mb-2">Curriculum Editor</h2>
          <p className="text-gray-700">Manage program curriculums and course requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Select Program</h3>
              <div className="space-y-2">
                {programs.map((program) => (
                  <button
                    key={program.code}
                    onClick={() => setSelectedProgram(program.code)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedProgram === program.code
                        ? 'text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={selectedProgram === program.code ? { backgroundColor: '#D65A1E' } : {}}
                  >
                    <div className="mb-1">{program.code}</div>
                    <div className="text-sm opacity-80">{program.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-gray-900 mb-4">Year Level</h3>
              <div className="space-y-2">
                {['1', '2', '3', '4'].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedYear === year
                        ? 'text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={selectedYear === year ? { backgroundColor: '#D65A1E' } : {}}
                  >
                    {year === '1' && 'First Year'}
                    {year === '2' && 'Second Year'}
                    {year === '3' && 'Third Year'}
                    {year === '4' && 'Fourth Year'}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#D65A1E' }}
            >
              <Plus className="w-5 h-5" />
              Add New Subject
            </button>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900">
                    {programs.find(p => p.code === selectedProgram)?.name} - Year {selectedYear}
                  </h3>
                  <p className="text-sm text-gray-600">Manage subjects and prerequisites</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-xl hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#D65A1E' }}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              {Object.entries(currentCurriculum).map(([semester, subjects]) => (
                <div key={semester} className="mb-8">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b-2" style={{ borderColor: '#D65A1E' }}>
                    <BookOpen className="w-5 h-5" style={{ color: '#D65A1E' }} />
                    <h3 style={{ color: '#D65A1E' }}>{semester}</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-700">Code</th>
                          <th className="px-4 py-3 text-left text-gray-700">Subject Name</th>
                          <th className="px-4 py-3 text-center text-gray-700">Units</th>
                          <th className="px-4 py-3 text-center text-gray-700">Type</th>
                          <th className="px-4 py-3 text-left text-gray-700">Prerequisite</th>
                          <th className="px-4 py-3 text-center text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(subjects as any[]).map((subject, idx) => (
                          <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">{subject.code}</td>
                            <td className="px-4 py-3 text-gray-900">{subject.name}</td>
                            <td className="px-4 py-3 text-center text-gray-900">{subject.units}</td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className="px-3 py-1 rounded-full text-sm"
                                style={{
                                  backgroundColor: subject.type === 'Major' ? '#D65A1E20' : '#3B82F620',
                                  color: subject.type === 'Major' ? '#D65A1E' : '#3B82F6'
                                }}
                              >
                                {subject.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{subject.prereq}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                                  <Edit className="w-4 h-4 text-blue-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-700">
                      Total Units: <span className="ml-2" style={{ color: '#D65A1E' }}>
                        {(subjects as any[]).reduce((sum, subject) => sum + subject.units, 0)} units
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-gray-900 mb-4">Curriculum Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Total Subjects</span>
                    <span className="text-gray-900">
                      {Object.values(currentCurriculum).reduce((sum, subjects) => sum + (subjects as any[]).length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Total Units</span>
                    <span className="text-gray-900">
                      {Object.values(currentCurriculum).reduce((sum, subjects) =>
                        sum + (subjects as any[]).reduce((s, subj) => s + subj.units, 0), 0
                      )} units
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Major Subjects</span>
                    <span className="text-gray-900">
                      {Object.values(currentCurriculum).reduce((sum, subjects) =>
                        sum + (subjects as any[]).filter(s => s.type === 'Major').length, 0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">GE Subjects</span>
                    <span className="text-gray-900">
                      {Object.values(currentCurriculum).reduce((sum, subjects) =>
                        sum + (subjects as any[]).filter(s => s.type === 'GE').length, 0
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                    Import from CSV
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                    Export to PDF
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                    View Full Curriculum
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-gray-700">
                    Copy to Another Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
