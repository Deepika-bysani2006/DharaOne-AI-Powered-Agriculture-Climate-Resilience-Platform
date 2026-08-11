import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin, UserRound } from "lucide-react";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import PasswordField from "../components/PasswordField.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getFriendlyAuthError } from "../lib/authErrors.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState("");
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      return "Complete all required fields.";
    }
    if (!emailPattern.test(form.email)) {
      return "Enter a valid email address.";
    }
    if (form.password.length < 8) {
      return "Use at least 8 characters for your password.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const validationMessage = validate();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setLoadingAction("email");
    try {
      await signup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
      if (form.location.trim()) {
        window.localStorage.setItem("dharaone-profile-location", form.location.trim());
      }
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setMessage(getFriendlyAuthError(authError));
    } finally {
      setLoadingAction("");
    }
  };

  const handleGoogleSignup = async () => {
    setLoadingAction("google");
    setMessage("");
    try {
      await loginWithGoogle();
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setMessage(getFriendlyAuthError(authError));
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <AuthLayout eyebrow="Start your DharaOne workspace">
      <div className="auth-card">
        <div className="auth-heading">
          <h2>Create your DharaOne account</h2>
          <p>Track crops, weather risk, treatments, and Vana AI insights in one place.</p>
        </div>

        <StatusMessage id="signup-error" message={message} />

        <form className="auth-form" onSubmit={handleSignup}>
          <label className="field" htmlFor="name">
            <span>Full name</span>
            <div className="input-with-icon">
              <UserRound aria-hidden="true" size={18} />
              <input
                aria-describedby={message ? "signup-error" : undefined}
                autoComplete="name"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
                value={form.name}
              />
            </div>
          </label>

          <label className="field" htmlFor="signup-email">
            <span>Email</span>
            <div className="input-with-icon">
              <Mail aria-hidden="true" size={18} />
              <input
                autoComplete="email"
                id="signup-email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                value={form.email}
              />
            </div>
          </label>

          <PasswordField
            autoComplete="new-password"
            id="signup-password"
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="At least 8 characters"
            value={form.password}
          />

          <PasswordField
            autoComplete="new-password"
            id="confirm-password"
            label="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Repeat your password"
            value={form.confirmPassword}
          />

          <label className="field" htmlFor="location">
            <span>Location <em>optional</em></span>
            <div className="input-with-icon">
              <MapPin aria-hidden="true" size={18} />
              <input
                autoComplete="address-level2"
                id="location"
                name="location"
                onChange={handleChange}
                placeholder="District or farm region"
                value={form.location}
              />
            </div>
          </label>

          <button className="primary-button" disabled={!!loadingAction} type="submit">
            {loadingAction === "email" ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <GoogleSignInButton
          disabled={loadingAction === "email"}
          loading={loadingAction === "google"}
          onClick={handleGoogleSignup}
        />

        <p className="auth-footer-copy">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
