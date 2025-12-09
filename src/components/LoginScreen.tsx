import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    // --- Supabase login check ---
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Invalid email or password.");
      return;
    }

    // Save session locally
    localStorage.setItem("user", JSON.stringify(data));

    // Redirect based on role
    if (data.role === "admin") navigate("/admin/dashboard");
    else if (data.role === "faculty") navigate("/faculty/dashboard");
    else if (data.role === "registrar") navigate("/registrar/dashboard");
    else alert("Unknown user role.");
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
            <h1 className="text-orange-800">Palawan State University</h1>
            <p className="text-orange-700">Student Portal</p>
          </div>
        </div>
        
        <h2 className="text-orange-900 mb-4">Welcome to PSU Enrollment System</h2>
        <p className="text-orange-800 mb-6">
          Access your academic records, enroll in subjects, manage payments, and view your class schedules all in one place.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-2" style={{ color: '#D65A1E' }}>24/7</div>
            <div className="text-orange-800">Access Anytime</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-2" style={{ color: '#D65A1E' }}>100%</div>
            <div className="text-orange-800">Secure Platform</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Login</h2>
          <p className="text-gray-600">Enter your credentials to access the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              placeholder="your.email@psu.edu.ph"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#D65A1E' }}
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p className="mb-3">Demo accounts (use password: <span style={{ color: '#D65A1E' }}>psu2025</span>)</p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-gray-50 rounded-lg">
                <strong>Admin:</strong> admin@psu.edu.ph
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <strong>Faculty:</strong> faculty@psu.edu.ph
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
