import { useState } from "react";

export default function AuthModal({ type, onClose, onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");

    onAuth({ email });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl w-80 space-y-4 border border-white/10"
      >
        <h2 className="text-xl font-bold text-white">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>

        <input
          placeholder="Email"
          className="w-full p-2 rounded bg-black/40 border border-white/10 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-black/40 border border-white/10 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-purple-600 py-2 rounded text-white">
          {type === "login" ? "Login" : "Create Account"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full text-sm text-gray-400"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
