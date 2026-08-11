import { LogOut, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

function getInitials(user) {
  const name = user?.displayName || user?.email || "D";
  return name
    .split(/[ @.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { currentUser, logout, providerName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="user-menu">
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="user-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {currentUser?.photoURL ? (
          <img src={currentUser.photoURL} alt="" />
        ) : (
          <span aria-hidden="true">{getInitials(currentUser)}</span>
        )}
        <span className="user-trigger-copy">
          <strong>{currentUser?.displayName || "DharaOne user"}</strong>
          <small>{currentUser?.email}</small>
        </span>
      </button>

      {open && (
        <div className="user-popover" role="menu">
          <div className="profile-summary">
            {currentUser?.photoURL ? <img src={currentUser.photoURL} alt="" /> : <span>{getInitials(currentUser)}</span>}
            <div>
              <strong>{currentUser?.displayName || "DharaOne user"}</strong>
              <small>{currentUser?.email}</small>
              <em>{providerName} sign-in</em>
            </div>
          </div>
          <button role="menuitem" type="button">
            <UserRound aria-hidden="true" size={17} />
            Profile
          </button>
          <button role="menuitem" type="button">
            <Settings aria-hidden="true" size={17} />
            Settings
          </button>
          <div className="menu-theme" role="menuitem">
            <span>Theme</span>
            <ThemeSwitcher compact />
          </div>
          <button disabled={loggingOut} onClick={handleLogout} role="menuitem" type="button">
            <LogOut aria-hidden="true" size={17} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
