import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getFriendlyAuthError } from "../lib/authErrors.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "error", message: "" });
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", message: "Enter your email address to reset your password." });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setStatus({
        type: "success",
        message: "Password reset link sent. Check your inbox for the next step.",
      });
    } catch (authError) {
      setStatus({ type: "error", message: getFriendlyAuthError(authError) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout eyebrow="Recover access to DharaOne">
      <div className="auth-card compact-card">
        <div className="auth-heading">
          <h2>Reset your password</h2>
          <p>Enter your email and we'll send you a password reset link.</p>
        </div>

        <StatusMessage id="reset-status" message={status.message} type={status.type} />

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field" htmlFor="reset-email">
            <span>Email</span>
            <div className="input-with-icon">
              <Mail aria-hidden="true" size={18} />
              <input
                aria-describedby={status.message ? "reset-status" : undefined}
                autoComplete="email"
                id="reset-email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setStatus({ type: "error", message: "" });
                }}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
            </div>
          </label>

          <button className="primary-button" disabled={loading} type="submit">
            {loading ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <p className="auth-footer-copy">
          Remembered your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
