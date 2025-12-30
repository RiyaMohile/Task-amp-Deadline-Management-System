import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "intern",
  });

  const handleRegister = async () => {
    try {
      await API.post("https://taskproject-backend-0sqw.onrender.com/api/auth/register", form);

      alert("Registration successful");

      
      localStorage.setItem("fromRegister", "true");

      if (form.role === "admin") navigate("/admin-login");
      else navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      
      
      <div className="bg-white p-8 w-[420px] rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <input
          className="border border-gray-300 p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border border-gray-300 p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border border-gray-300 p-3 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        
        <div className="flex justify-center gap-8 mb-6 text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={form.role === "intern"}
              onChange={() => setForm({ ...form, role: "intern" })}
            />
            User
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={form.role === "admin"}
              onChange={() => setForm({ ...form, role: "admin" })}
            />
            Admin
          </label>
        </div>

        <button
          onClick={handleRegister}
          className="bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Register
        </button>

        
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}
