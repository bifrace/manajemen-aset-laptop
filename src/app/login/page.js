"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login gagal");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
  <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded w-80">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login Admin</h2>
    <input
      type="text"
      placeholder="Username"
      className="w-full border border-gray-300 text-gray-800 p-2 mb-3 rounded"
      onChange={(e) => setForm({ ...form, username: e.target.value })}
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full border border-gray-300 text-gray-800 p-2 mb-3 rounded"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
      Masuk
    </button>
  </form>
</div>
  );
}
