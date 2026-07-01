import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { notifySuccess, notifyError } from "../utils/toast";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  notifySuccess(
    "Account created successfully!"
  );
};

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6">
        Register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Role Selection */}
        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}