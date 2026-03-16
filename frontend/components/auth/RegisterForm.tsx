"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/api/v1/auth/register", {
        username: username,
        email: email,
        password: password,
      });

      toast.success(
        "Registration Successful !" + "\n" + "Welcome join the Journey ✈️",
        {
          duration: 2500,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        },
      );

      router.push("/login");
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || "註冊失敗，請檢查資料";
      toast.error(errorMsg, {
        duration: 2500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);

      setUsername("");
      setEmail(""); // 清空帳號
      setPassword(""); // 清空密碼
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Username
          </label>
          <input
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-zinc-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-zinc-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-zinc-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? "Processing" : "Register"}
        </button>
      </form>
    </div>
  );
}
