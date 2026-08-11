import React from "react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import Logo from "./Logo.jsx";

export default function AuthLayout({ children, eyebrow }) {
  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="DharaOne overview">
        <Logo />
        <div className="auth-brand-copy">
          <p>{eyebrow}</p>
          <h1>Healthier crops. Stronger tomorrows.</h1>
          <span>
            DharaOne helps growers monitor risk, respond to changing weather, and manage crop care
            with Vana AI inside the platform.
          </span>
        </div>
        <div className="field-visual" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-topbar">
          <Logo compact />
          <ThemeSwitcher compact />
        </div>
        {children}
      </section>
    </main>
  );
}
