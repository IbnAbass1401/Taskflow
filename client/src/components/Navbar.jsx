import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-navy text-mist">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <span className="font-display text-2xl font-semibold">TaskFlow</span>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-mist/70 sm:inline">{user.name}</span>
          <button
            onClick={logout}
            className="rounded-lg border border-mist/20 px-3.5 py-2 text-sm font-medium transition duration-150 hover:border-sky hover:bg-mist/10 active:scale-95"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}