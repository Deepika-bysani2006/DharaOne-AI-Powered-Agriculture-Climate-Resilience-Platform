import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import PasswordField from "../components/PasswordField.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getFriendlyAuthError } from "../lib/authErrors.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoadingAction("email");
    try {
      await login(form.email, form.password);
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(getFriendlyAuthError(authError));
    } finally {
      setLoadingAction("");
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingAction("google");
    setError("");
    try {
      await loginWithGoogle();
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(getFriendlyAuthError(authError));
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <AuthLayout eyebrow="Secure crop intelligence for resilient farms">
      <div className="auth-card">
        <div className="auth-heading">
          <h2>Welcome back</h2>
          <p>Sign in to continue managing your crops with DharaOne.</p>
        </div>

        <StatusMessage id="login-error" message={error} />

        <form className="auth-form" onSubmit={handleEmailLogin}>
          <label className="field" htmlFor="email">
            <span>Email</span>
            <div className="input-with-icon">
              <Mail aria-hidden="true" size={18} />
              <input
                aria-describedby={error ? "login-error" : undefined}
                autoComplete="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                value={form.email}
              />
            </div>
          </label>

          <PasswordField
            autoComplete="current-password"
            errorId={error ? "login-error" : undefined}
            id="password"
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            value={form.password}
          />

          <Link className="quiet-link align-right" to="/forgot-password">
            Forgot password?
          </Link>

          <button className="primary-button" disabled={!!loadingAction} type="submit">
            {loadingAction === "email" ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <GoogleSignInButton
          disabled={loadingAction === "email"}
          loading={loadingAction === "google"}
          onClick={handleGoogleLogin}
        />

        <p className="auth-footer-copy">
          New to DharaOne? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
