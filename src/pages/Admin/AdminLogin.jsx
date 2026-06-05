import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials. Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#03092E] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-white font-light tracking-wide mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Admin Portal</h2>
          <p className="text-white/40 text-sm">Secure login for notice board management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-white/60 text-xs uppercase tracking-widest block mb-2 px-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-white/60 text-xs uppercase tracking-widest block mb-2 px-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-rose-400 text-xs text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-amber-400 hover:bg-amber-300 text-navy-900 font-bold py-4 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] uppercase text-xs tracking-widest"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
