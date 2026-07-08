import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("email", email);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <div className="w-80 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-300">

        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          Login
        </h2>

        <input
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
        >
          Login
        </button>

        <div className="mt-5 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            New user?{" "}
          </span>

          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>

      </div>

    </div>
  );
}