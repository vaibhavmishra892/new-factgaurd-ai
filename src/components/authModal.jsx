import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthModal({ type, onClose, onAuth }) {
  const isSignup = type === "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordStrength = () => {
    if (form.password.length < 6) return "Weak";
    if (form.password.length < 10) return "Medium";
    return "Strong";
  };

  const isValid =
    (!isSignup ||
      (form.firstName &&
        form.lastName &&
        form.phone.length >= 10)) &&
    form.email &&
    form.password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    onAuth({
      email: form.email,
      name: `${form.firstName} ${form.lastName}`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-xl font-bold mb-1 body-text">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-sm body-text-muted mb-5">
          {isSignup
            ? "Join FactGuard to verify information faster."
            : "Login to continue verification."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {isSignup && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="glass-input w-1/2 p-3 rounded-lg"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="glass-input w-1/2 p-3 rounded-lg"
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="glass-input w-full p-3 rounded-lg"
                onChange={handleChange}
                required
              />
              <p className="text-xs body-text-muted">
                We’ll never share your number.
              </p>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="glass-input w-full p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="glass-input w-full p-3 rounded-lg pr-10"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-purple-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isSignup && (
            <p
              className={`text-xs ${
                passwordStrength() === "Weak"
                  ? "text-red-500"
                  : passwordStrength() === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Password strength: {passwordStrength()}
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`btn-primary w-full ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm body-text-muted hover:text-purple-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
