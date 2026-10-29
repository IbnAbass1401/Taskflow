import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Field from "../components/Field";

const buttonClass =
  "w-full rounded-xl bg-royal px-4 py-4 text-lg font-medium text-mist transition duration-150 hover:bg-royal/90 active:scale-[0.98] disabled:opacity-60 lg:rounded-lg lg:py-2.5 lg:text-sm";

function Message({ msg }) {
  if (!msg.text) return null;
  const isError = msg.type === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={`rounded-lg border px-3 py-2 text-base lg:text-sm ${
        isError
          ? "border-danger/30 bg-danger/5 text-danger"
          : "border-royal/30 bg-royal/5 text-royal"
      }`}
    >
      {msg.text}
    </p>
  );
}

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [profileMsg, setProfileMsg] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);

  const [pw, setPw] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwMsg, setPwMsg] = useState({});
  const [savingPw, setSavingPw] = useState(false);

  const handlePwChange = (e) => setPw({ ...pw, [e.target.name]: e.target.value });

  const handleProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({});
    setSavingProfile(true);
    try {
      await updateProfile(name);
      setProfileMsg({ type: "success", text: "Name updated" });
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.message || "Could not reach the server.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setPwMsg({});
    if (pw.newPassword !== pw.confirmPassword) {
      return setPwMsg({ type: "error", text: "New passwords do not match" });
    }
    setSavingPw(true);
    try {
      await changePassword(pw.currentPassword, pw.newPassword);
      setPw({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPwMsg({ type: "success", text: "Password updated" });
    } catch (err) {
      setPwMsg({
        type: "error",
        text: err.response?.data?.message || "Could not reach the server.",
      });
    } finally {
      setSavingPw(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist text-navy">
      <Navbar />
      <main className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <Link to="/" className="inline-block text-base font-medium text-royal hover:underline lg:text-sm">
          ← Back to dashboard
        </Link>

        <form
          onSubmit={handleProfile}
          className="space-y-5 rounded-2xl border border-frost bg-white p-6 lg:space-y-4"
        >
          <h2 className="font-display text-xl font-semibold">Profile</h2>
          <Field label="Email" id="email" type="email" value={user?.email || ""} disabled readOnly />
          <Field
            label="Name"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Message msg={profileMsg} />
          <button disabled={savingProfile} className={buttonClass}>
            {savingProfile ? "Saving..." : "Save name"}
          </button>
        </form>

        <form
          onSubmit={handlePassword}
          className="space-y-5 rounded-2xl border border-frost bg-white p-6 lg:space-y-4"
        >
          <h2 className="font-display text-xl font-semibold">Change password</h2>
          <Field
            label="Current password"
            id="currentPassword"
            type="password"
            placeholder="Your current password"
            value={pw.currentPassword}
            onChange={handlePwChange}
            required
          />
          <Field
            label="New password"
            id="newPassword"
            type="password"
            placeholder="At least 6 characters"
            minLength={6}
            value={pw.newPassword}
            onChange={handlePwChange}
            required
          />
          <Field
            label="Confirm new password"
            id="confirmPassword"
            type="password"
            placeholder="Repeat the new password"
            minLength={6}
            value={pw.confirmPassword}
            onChange={handlePwChange}
            required
          />
          <Message msg={pwMsg} />
          <button disabled={savingPw} className={buttonClass}>
            {savingPw ? "Updating..." : "Update password"}
          </button>
        </form>
      </main>
    </div>
  );
}