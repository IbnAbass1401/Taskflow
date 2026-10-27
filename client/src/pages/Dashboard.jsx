import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold">Hi, {user.name}</h1>
      <p className="mt-2 text-navy/70">Your board is coming next.</p>
      <button
        onClick={logout}
        className="mt-6 rounded-lg border border-frost bg-white px-4 py-2 text-sm font-medium transition duration-150 hover:border-sky hover:bg-frost/50"
      >
        Log out
      </button>
    </div>
  );
}