import { ArrowLeft, Check, X, Eye, FileText, Calendar, CreditCard } from 'lucide-react';
import { User } from '../App';
import { useState } from 'react';

interface EnrollmentApprovalProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function EnrollmentApproval({ user, onNavigate }: EnrollmentApprovalProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const pendingEnrollments = [
    {
      id: 1,
      studentId: '2025-00001',
      name: 'Juan Dela Cruz',
      program: 'BS Computer Science',
      year: '1st Year',
      semester: '2nd Semester',
      date: '2025-11-26',
      units: 21,
      subjects: [
        { code: 'CS 101', name: 'Introduction to Programming', units: 3, schedule: 'MWF 8:00-9:30 AM', instructor: 'Dr. Maria Santos' },
        { code: 'MATH 101', name: 'Calculus I', units: 3, schedule: 'TTH 10:00-11:30 AM', instructor: 'Prof. Juan Reyes' },
        { code: 'ENG 101', name: 'English Communication', units: 3, schedule: 'MWF 1:00-2:30 PM', instructor: 'Prof. Ana Cruz' },
        { code: 'PE 101', name: 'Physical Education', units: 2, schedule: 'TTH 3:00-4:00 PM', instructor: 'Coach Mark Lopez' },
        { code: 'NSTP 101', name: 'National Service Training Program', units: 3, schedule: 'SAT 8:00-11:00 AM', instructor: 'Lt. Pedro Garcia' },
        { code: 'HIST 101', name: 'Philippine History', units: 3, schedule: 'MWF 3:00-4:30 PM', instructor: 'Prof. Rosa Martinez' },
        { code: 'SCI 101', name: 'General Science', units: 4, schedule: 'TTH 1:00-3:00 PM', instructor: 'Dr. Carlos Gonzales' },
      ],
      gpa: 0.0,
      status: 'New Student'
    },
    {
      id: 2,
      studentId: '2025-00002',
      name: 'Maria Garcia',
      program: 'BS Information Technology',
      year: '2nd Year',
      semester: '2nd Semester',
      date: '2025-11-26',
      units: 24,
      subjects: [
        { code: 'IT 201', name: 'Database Management', units: 3, schedule: 'MWF 10:00-11:30 AM', instructor: 'Prof. Anna Reyes' },
        { code: 'IT 202', name: 'Web Development', units: 3, schedule: 'TTH 1:00-2:30 PM', instructor: 'Prof. Mark Santos' },
        { code: 'IT 203', name: 'Systems Analysis', units: 3, schedule: 'MWF 2:00-3:30 PM', instructor: 'Dr. Luis Cruz' },
        { code: 'MATH 201', name: 'Statistics', units: 3, schedule: 'TTH 8:00-9:30 AM', instructor: 'Prof. Elena Lopez' },
      ],
      gpa: 3.45,
      status: 'Good Standing'
    },
    {
      id: 3,
      studentId: '2025-00003',
      name: 'Pedro Reyes',
      program: 'BS Business Administration',
      year: '1st Year',
      semester: '2nd Semester',
      date: '2025-11-25',
      units: 21,
      subjects: [
        { code: 'BA 101', name: 'Principles of Management', units: 3, schedule: 'MWF 9:00-10:30 AM', instructor: 'Prof. Diana Torres' },
        { code: 'ACCT 101', name: 'Fundamentals of Accounting', units: 3, schedule: 'TTH 11:00-12:30 PM', instructor: 'CPA Jose Ramos' },
        { code: 'ECON 101', name: 'Microeconomics', units: 3, schedule: 'MWF 11:00-12:30 PM', instructor: 'Prof. Sofia Mendez' },
      ],
      gpa: 0.0,
      status: 'New Student'
    },
  ];

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
          <h2 className="text-gray-900 mb-2">Enrollment Approval</h2>
          <p className="text-gray-700">Review and approve student enrollment requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {pendingEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all ${
                  selectedStudent?.id === enrollment.id ? 'ring-4 ring-orange-200' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{enrollment.name}</h3>
                        <span className="px-3 py-1 rounded-full text-sm" style={{
                          backgroundColor: enrollment.status === 'New Student' ? '#3B82F620' : '#10B98120',
                          color: enrollment.status === 'New Student' ? '#3B82F6' : '#10B981'
                        }}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {enrollment.studentId} • {enrollment.program}
                      </div>
                      <div className="text-sm text-gray-600">
                        {enrollment.year} • {enrollment.semester}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStudent(enrollment)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Total Units</div>
                      <div className="text-gray-900">{enrollment.units}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current GPA</div>
                      <div className="text-gray-900">{enrollment.gpa || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Submitted</div>
                      <div className="text-gray-900">{enrollment.date}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: '#D65A1E' }}
                    >
                      <Check className="w-5 h-5" />
                      Approve
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                      <X className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {selectedStudent ? (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: '#D65A1E20' }}>
                      <FileText className="w-5 h-5" style={{ color: '#D65A1E' }} />
                    </div>
                    <h3 className="text-gray-900">Enrollment Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Student Name</div>
                      <div className="text-gray-900">{selectedStudent.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Student ID</div>
                      <div className="text-gray-900">{selectedStudent.studentId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Program</div>
                      <div className="text-gray-900">{selectedStudent.program}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Year Level</div>
                      <div className="text-gray-900">{selectedStudent.year}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#FFF5EE' }}>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" style={{ color: '#D65A1E' }} />
                      <h3 style={{ color: '#D65A1E' }}>Enrolled Subjects</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedStudent.subjects.map((subject: any, idx: number) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-sm mb-1" style={{ color: '#D65A1E' }}>{subject.code}</div>
                          <div className="text-gray-900 text-sm mb-1">{subject.name}</div>
                          <div className="text-xs text-gray-600">{subject.units} units • {subject.schedule}</div>
                          <div className="text-xs text-gray-500">{subject.instructor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-green-100">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-gray-900">Payment Status</h3>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="text-green-800 mb-1">Fully Paid</div>
                    <div className="text-sm text-green-600">Payment verified on {selectedStudent.date}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="text-center text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select an enrollment request to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
