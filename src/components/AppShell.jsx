import React from "react";
import {
  Bot,
  CloudSun,
  History,
  LayoutDashboard,
  Menu,
  ScanSearch,
  Sprout,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "./Logo.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import UserMenu from "./UserMenu.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vana-ai", label: "Vana AI", icon: Bot },
  { to: "/scanner", label: "Crop Scanner", icon: ScanSearch },
  { to: "/treatments", label: "Treatments", icon: Sprout },
  { to: "/history", label: "Crop History", icon: History },
  { to: "/weather", label: "Weather", icon: CloudSun },
];

function Navigation({ onNavigate }) {
  return (
    <nav className="app-nav" aria-label="Primary navigation">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} onClick={onNavigate} to={to}>
          <Icon aria-hidden="true" size={19} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button
            aria-label="Close navigation"
            className="icon-button mobile-only"
            onClick={() => setMobileOpen(false)}
            title="Close navigation"
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <Navigation onNavigate={() => setMobileOpen(false)} />
        <div className="sidebar-footer">
          <span>Climate resilience workspace</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button
            aria-label="Open navigation"
            className="icon-button mobile-only"
            onClick={() => setMobileOpen(true)}
            title="Open navigation"
            type="button"
          >
            <Menu aria-hidden="true" size={21} />
          </button>
          <div>
            <strong>DharaOne</strong>
            <span>AI-powered agriculture platform</span>
          </div>
          <div className="topbar-actions">
            <ThemeSwitcher />
            <UserMenu />
          </div>
        </header>
        <Outlet />
      </div>

      <div className="bottom-nav">
        <Navigation />
      </div>
    </div>
  );
}
