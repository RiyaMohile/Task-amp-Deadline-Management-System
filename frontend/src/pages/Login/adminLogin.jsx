import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function AdminLogin() {
  const fromRegister = localStorage.getItem("fromRegister");

  const [email, setEmail] = useState(fromRegister ? "" : "admin@test.com");
  const [password, setPassword] = useState(fromRegister ? "" : "Admin@123");

  useEffect(() => {
    localStorage.removeItem("fromRegister");
  }, []);

  const handleLogin = async () => {
    try {
      const res = await API.post("https://taskproject-backend-0sqw.onrender.com/api/auth/login", { email, password });

      if (res.data.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      window.location = "/admin";
    } catch {
      alert("Invalid admin credentials");
    }
  };

  return (
    
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      
      <div className="bg-white p-8 w-96 rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <input
          className="border border-gray-300 p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="border border-gray-300 p-3 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="text-center mt-5 text-sm text-gray-600 flex justify-between">
          <Link to="/" className="text-blue-600 hover:underline">
            User Login
          </Link>
          <br />
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
