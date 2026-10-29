import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full rounded-xl border border-frost bg-mist px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-sky";
const buttonClass =
  "rounded-xl bg-royal px-5 py-3 font-medium text-mist transition hover:bg-royal/90 disabled:opacity-60";

function Message({ msg }) {
  if (!msg.text) return null;
  return (
    <p className={`text-sm ${msg.type === "error" ? "text-red-600" : "text-royal"}`}>
      {msg.text}
    </p>
  );
}

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [profileMsg, setProfileMsg] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState({});
  const [savingPw, setSavingPw] = useState(false);

  const handleProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg({});
    try {
      await updateProfile(name);
      setProfileMsg({ type: "success", text: "Name updated" });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Something went wrong" });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setPwMsg({});
    if (pw.next !== pw.confirm) {
      return setPwMsg({ type: "error", text: "New passwords do not match" });
    }
    setSavingPw(true);
    try {
      await changePassword(pw.current, pw.next);
      setPw({ current: "", next: "", confirm: "" });
      setPwMsg({ type: "success", text: "Password updated" });
    } catch (err) {
      setPwMsg({ type: "error", text: err.response?.data?.message || "Something went wrong" });
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
      <Link to="/" className="text-sm text-royal hover:underline">
        ← Back to dashboard
      </Link>

      <form onSubmit={handleProfile} className="space-y-4 rounded-2xl border border-frost bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-navy">Profile</h2>
        <div>
          <label className="mb-1 block text-sm text-navy/70">Email</label>
          <input value={user?.email || ""} disabled className={`${inputClass} opacity-60`} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-navy/70">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <Message msg={profileMsg} />
        <button disabled={savingProfile} className={buttonClass}>
          {savingProfile ? "Saving..." : "Save name"}
        </button>
      </form>

      <form onSubmit={handlePassword} className="space-y-4 rounded-2xl border border-frost bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-navy">Change password</h2>
        <input type="password" placeholder="Current password" value={pw.current}
          onChange={(e) => setPw({ ...pw, current: e.target.value })} className={inputClass} />
        <input type="password" placeholder="New password" value={pw.next}
          onChange={(e) => setPw({ ...pw, next: e.target.value })} className={inputClass} />
        <input type="password" placeholder="Confirm new password" value={pw.confirm}
          onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputClass} />
        <Message msg={pwMsg} />
        <button disabled={savingPw} className={buttonClass}>
          {savingPw ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}