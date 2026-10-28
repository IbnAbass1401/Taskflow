import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";

export default function Login() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
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
      title="Welcome back"
      subtitle="Sign in to see your tasks."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="font-medium text-royal hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-4">
        <Field label="Email" id="email" type="email" placeholder="you@example.com"
          value={form.email} onChange={handleChange} required />
        <Field label="Password" id="password" type="password" placeholder="Your password"
          value={form.password} onChange={handleChange} required />

        {error && (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-base text-danger lg:text-sm">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-royal px-4 py-4 text-lg font-medium text-mist transition duration-150 hover:bg-royal/90 active:scale-[0.98] disabled:opacity-60 lg:rounded-lg lg:py-2.5 lg:text-sm"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}