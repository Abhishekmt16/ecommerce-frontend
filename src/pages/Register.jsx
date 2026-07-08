import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      if (res.data === "User registered successfully") {
        alert("Registration successful ✅");
        navigate("/login");
      } else {
        alert(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <div className="w-80 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-300">

        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          Register
        </h2>

        <input
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
        >
          Register
        </button>

        <div className="mt-5 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
          </span>

          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>

      </div>

    </div>
  );
}