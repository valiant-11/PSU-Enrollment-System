import { supabase } from './supabase';
import { getUserByEmail } from './lib/db';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'faculty' | 'registrar' | 'student';
  is_active: boolean;
}

// Get currently logged-in user from localStorage
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

// Get user ID from current session
export const getCurrentUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.id || null;
};

// Check if user has required role
export const requireRole = (requiredRole: string): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === requiredRole;
};

// Check if user has any of the required roles
export const requireAnyRole = (roles: string[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  return roles.includes(user.role);
};

// Authenticate user with email and password
export const authenticateUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return { user: null, error: 'Invalid email or password' };
    }

    // TODO: Implement proper password hashing and verification
    // For now, assuming password is stored as plain text (NOT SECURE FOR PRODUCTION)
    // if (data.password_hash !== hashPassword(password)) {
    //   return { user: null, error: 'Invalid email or password' };
    // }

    if (!data.is_active) {
      return { user: null, error: 'Account is inactive' };
    }

    return { user: data as User, error: null };
  } catch (err) {
    return { user: null, error: 'Authentication failed' };
  }
};

// Save user session to localStorage
export const saveUserSession = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Clear user session from localStorage
export const clearUserSession = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('psu_current_student');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Get user role
export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user?.role || null;
};

// Log out current user
export const logout = (): void => {
  clearUserSession();
};
