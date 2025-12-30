import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function UserLogin() {
  const fromRegister = localStorage.getItem("fromRegister");

  const [email, setEmail] = useState(fromRegister ? "" : "intern@test.com");
  const [password, setPassword] = useState(fromRegister ? "" : "Intern@123");

  useEffect(() => {
    localStorage.removeItem("fromRegister");
  }, []);

  const handleLogin = async () => {
    try {
      const res = await API.post("https://taskproject-backend-0sqw.onrender.com/api/auth/login", { email, password });

      if (res.data.role !== "intern") {
        alert("Not a user account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      window.location = "/intern";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
      
      
      <div className="bg-white p-8 w-96 rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          User Login
        </h2>

        <input
          className="border border-gray-300 p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="border border-gray-300 p-3 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="text-center mt-5 text-sm text-gray-600 flex justify-between">
          <Link to="/admin-login" className="text-blue-600 hover:underline ">
            Admin Login
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
