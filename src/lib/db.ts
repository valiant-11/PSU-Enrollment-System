import { supabase } from '../supabase';

// ==========================================
// USER & AUTHENTICATION FUNCTIONS
// ==========================================

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  return { data, error };
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  return { data, error };
}

export async function createUser(email: string, fullName: string, role: 'admin' | 'faculty' | 'registrar' | 'student') {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email,
      full_name: fullName,
      role,
      is_active: true
    }])
    .select()
    .single();
  return { data, error };
}

// ==========================================
// STUDENT FUNCTIONS
// ==========================================

export async function getStudentByUserId(userId: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*, courses(*)')
    .eq('user_id', userId)
    .single();
  return { data, error };
}

export async function getStudentByNumber(studentNumber: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*, courses(*), users(*)')
    .eq('student_number', studentNumber)
    .single();
  return { data, error };
}

export async function getAllStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*, courses(*), users(*)');
  return { data, error };
}

export async function createStudent(userId: string, studentData: any) {
  const { data, error } = await supabase
    .from('students')
    .insert([{
      user_id: userId,
      student_number: studentData.studentNumber,
      corp_email: studentData.corpEmail,
      full_name: studentData.fullName,
      birthdate: studentData.birthdate,
      sex: studentData.sex,
      address: studentData.address,
      personal_email: studentData.personalEmail,
      phone: studentData.phone,
      course_id: studentData.courseId,
      year_level: studentData.yearLevel,
      last_school: studentData.lastSchool,
      strand: studentData.strand,
      year_graduated: studentData.yearGraduated,
      enrollment_status: 'active'
    }])
    .select()
    .single();
  return { data, error };
}

export async function updateStudent(studentId: string, updates: any) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', studentId)
    .select()
    .single();
  return { data, error };
}

// ==========================================
// COURSE & SUBJECT FUNCTIONS
// ==========================================

export async function getAllCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true);
  return { data, error };
}

export async function getCourseById(courseId: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
  return { data, error };
}

export async function getSubjectsByCourse(courseId: string, yearLevel?: string) {
  let query = supabase
    .from('subjects')
    .select('*')
    .eq('course_id', courseId)
    .eq('is_active', true);
  
  if (yearLevel) {
    query = query.eq('year_level', yearLevel);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function getSubjectById(subjectId: string) {
  const { data, error } = await supabase
    .from('subjects')
    .select('*, courses(*)')
    .eq('id', subjectId)
    .single();
  return { data, error };
}

export async function getAllSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('*, courses(*)')
    .eq('is_active', true);
  return { data, error };
}

export async function createSubject(subjectData: any) {
  const { data, error } = await supabase
    .from('subjects')
    .insert([subjectData])
    .select()
    .single();
  return { data, error };
}

// ==========================================
// ENROLLMENT FUNCTIONS
// ==========================================

export async function getStudentEnrollments(studentId: string, academicYear?: string) {
  let query = supabase
    .from('student_enrollments')
    .select('*, subjects(*), enrollment_approvals(*)')
    .eq('student_id', studentId);
  
  if (academicYear) {
    query = query.eq('academic_year', academicYear);
  }
  
  const { data, error } = await query;
  return { data, error };
}

export async function enrollStudent(studentId: string, subjectId: string, semester: string, academicYear: string) {
  // Create enrollment
  const { data: enrollmentData, error: enrollmentError } = await supabase
    .from('student_enrollments')
    .insert([{
      student_id: studentId,
      subject_id: subjectId,
      semester,
      academic_year: academicYear,
      status: 'enrolled'
    }])
    .select()
    .single();
  
  if (enrollmentError) return { data: null, error: enrollmentError };
  
  // Create approval record
  const { data: approvalData, error: approvalError } = await supabase
    .from('enrollment_approvals')
    .insert([{
      student_enrollment_id: enrollmentData.id,
      student_id: studentId,
      status: 'pending'
    }])
    .select()
    .single();
  
  return { data: enrollmentData, error: approvalError };
}

export async function getPendingEnrollments() {
  const { data, error } = await supabase
    .from('enrollment_approvals')
    .select('*, student_enrollments(*, students(*), subjects(*))')
    .eq('status', 'pending')
    .order('requested_at', { ascending: false });
  return { data, error };
}

export async function approveEnrollment(approvalId: string, processedBy: string) {
  const { data, error } = await supabase
    .from('enrollment_approvals')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: processedBy
    })
    .eq('id', approvalId)
    .select()
    .single();
  return { data, error };
}

export async function rejectEnrollment(approvalId: string, processedBy: string, rejectionReason: string) {
  const { data, error } = await supabase
    .from('enrollment_approvals')
    .update({
      status: 'rejected',
      processed_at: new Date().toISOString(),
      processed_by: processedBy,
      rejection_reason: rejectionReason
    })
    .eq('id', approvalId)
    .select()
    .single();
  return { data, error };
}

// ==========================================
// GRADE FUNCTIONS
// ==========================================

export async function getStudentGrades(studentId: string) {
  const { data, error } = await supabase
    .from('grades')
    .select('*, subjects(*), users(*)')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function recordGrade(enrollmentId: string, studentId: string, subjectId: string, grade: number, remarks: string, facultyId: string) {
  const { data, error } = await supabase
    .from('grades')
    .insert([{
      enrollment_id: enrollmentId,
      student_id: studentId,
      subject_id: subjectId,
      grade,
      remarks,
      faculty_id: facultyId
    }])
    .select()
    .single();
  return { data, error };
}

export async function getEnrollmentsBySubject(subjectId: string, academicYear?: string) {
  let query = supabase
    .from('student_enrollments')
    .select('*, students(*), grades(*)')
    .eq('subject_id', subjectId)
    .eq('status', 'enrolled');
  
  if (academicYear) {
    query = query.eq('academic_year', academicYear);
  }
  
  const { data, error } = await query;
  return { data, error };
}

// ==========================================
// PAYMENT FUNCTIONS
// ==========================================

export async function recordPayment(studentId: string, amount: number, paymentMethod: string, referenceNumber?: string, description?: string) {
  const { data, error } = await supabase
    .from('payments')
    .insert([{
      student_id: studentId,
      amount,
      payment_method: paymentMethod,
      reference_number: referenceNumber,
      description,
      status: 'completed'
    }])
    .select()
    .single();
  return { data, error };
}

export async function getStudentPayments(studentId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('student_id', studentId)
    .order('payment_date', { ascending: false });
  return { data, error };
}

export async function getPaymentStats(studentId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('amount')
    .eq('student_id', studentId)
    .eq('status', 'completed');
  
  if (error) return { total: 0, count: 0, error };
  
  const total = data?.reduce((sum, p) => sum + p.amount, 0) || 0;
  return { total, count: data?.length || 0, error: null };
}

// ==========================================
// SHIFTING REQUEST FUNCTIONS
// ==========================================

export async function requestShifting(studentId: string, fromCourseId: string, toCourseId: string, reason: string) {
  const { data, error } = await supabase
    .from('shifting_requests')
    .insert([{
      student_id: studentId,
      from_course_id: fromCourseId,
      to_course_id: toCourseId,
      reason,
      status: 'pending'
    }])
    .select()
    .single();
  return { data, error };
}

export async function getStudentShiftingRequest(studentId: string) {
  const { data, error } = await supabase
    .from('shifting_requests')
    .select('*')
    .eq('student_id', studentId)
    .order('requested_at', { ascending: false })
    .limit(1)
    .single();
  return { data, error };
}

export async function getPendingShiftingRequests() {
  const { data, error } = await supabase
    .from('shifting_requests')
    .select('*, students(full_name, student_number), from_course:courses!from_course_id(course_name), to_course:courses!to_course_id(course_name)')
    .eq('status', 'pending')
    .order('requested_at', { ascending: false });
  return { data, error };
}

export async function approveShiftingRequest(requestId: string, processedBy: string, remarks?: string) {
  const { data, error } = await supabase
    .from('shifting_requests')
    .update({
      status: 'approved',
      processed_at: new Date().toISOString(),
      processed_by: processedBy,
      remarks
    })
    .eq('id', requestId)
    .select()
    .single();
  return { data, error };
}

// ==========================================
// DOCUMENT FUNCTIONS
// ==========================================

export async function uploadDocument(studentId: string, documentType: string, fileUrl: string, filePath: string) {
  const { data, error } = await supabase
    .from('documents')
    .insert([{
      student_id: studentId,
      document_type: documentType,
      file_url: fileUrl,
      file_path: filePath,
      is_verified: false
    }])
    .select()
    .single();
  return { data, error };
}

export async function getStudentDocuments(studentId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('student_id', studentId);
  return { data, error };
}

export async function verifyDocument(documentId: string, verifiedBy: string) {
  const { data, error } = await supabase
    .from('documents')
    .update({
      is_verified: true,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString()
    })
    .eq('id', documentId)
    .select()
    .single();
  return { data, error };
}

// ==========================================
// REPORTING & ANALYTICS FUNCTIONS
// ==========================================

export async function getStudentTranscript(studentId: string) {
  const { data, error } = await supabase
    .from('grades')
    .select('*, subjects(subject_code, subject_name, units), student_enrollments(semester, academic_year)')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getEnrolledStudentsCount() {
  const { data, error } = await supabase
    .from('students')
    .select('id', { count: 'exact', head: true })
    .eq('enrollment_status', 'active');
  return { count: data?.length || 0, error };
}

export async function getActiveCoursesCount() {
  const { data, error } = await supabase
    .from('courses')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true);
  return { count: data?.length || 0, error };
}

export async function getAuditLog(limit: number = 50) {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*, users(full_name, role)')
    .order('timestamp', { ascending: false })
    .limit(limit);
  return { data, error };
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

export async function logAction(userId: string | null, action: string, entityType: string, entityId: string, changes?: any) {
  const { error } = await supabase
    .from('audit_logs')
    .insert([{
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      changes,
      timestamp: new Date().toISOString()
    }]);
  return { error };
}
