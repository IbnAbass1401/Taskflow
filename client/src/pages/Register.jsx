import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";

export default function Register() {
  const { user, register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not reach the server. Check that it is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-royal hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Name" id="name" placeholder="Your name"
          value={form.name} onChange={handleChange} required />
        <Field label="Email" id="email" type="email" placeholder="you@example.com"
          value={form.email} onChange={handleChange} required />
        <Field label="Password" id="password" type="password" placeholder="At least 6 characters"
          minLength={6} value={form.password} onChange={handleChange} required />

        {error && (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-royal px-4 py-2.5 font-medium text-mist transition duration-150 hover:bg-royal/90 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}