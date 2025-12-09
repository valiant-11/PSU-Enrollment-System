import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { supabase } from '../supabase';

interface LoginScreenProps {
  onLoginSuccess: (user: any) => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }

    try {
      // --- Supabase login check ---
      const { data, error: supabaseError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (supabaseError || !data) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // For demo: accept any password (in production, use proper auth)
      if (password !== 'psu2025') {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Success - call parent callback
      onLoginSuccess(data);
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" 
         style={{ background: 'linear-gradient(135deg, #F5C8A8 0%, #F1BFA0 100%)' }}>
      
      <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#D65A1E' }}>
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-orange-800 text-2xl font-bold">Palawan State University</h1>
            <p className="text-orange-700">Admin Portal</p>
          </div>
        </div>
        
        <h2 className="text-orange-900 text-xl font-bold mb-4">Welcome to PSU Enrollment System</h2>
        <p className="text-orange-800 mb-6">
          Access your academic records, enroll in subjects, manage payments, and view your class schedules all in one place.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-2 text-xl font-bold" style={{ color: '#D65A1E' }}>24/7</div>
            <div className="text-orange-800 text-sm">Access Anytime</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-2 text-xl font-bold" style={{ color: '#D65A1E' }}>100%</div>
            <div className="text-orange-800 text-sm">Secure Platform</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-gray-900 text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-600">Enter your credentials to access the system</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="admin@psu.edu.ph"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#D65A1E' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p className="mb-3">Demo accounts (password: <span style={{ color: '#D65A1E' }} className="font-semibold">psu2025</span>)</p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-gray-50 rounded-lg">
                <strong>Admin:</strong> admin@psu.edu.ph
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <strong>Faculty:</strong> faculty1@psu.edu.ph
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <strong>Registrar:</strong> registrar@psu.edu.ph
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          One Unified System — different access levels based on your account.
        </div>
      </div>
    </div>
  );
}
