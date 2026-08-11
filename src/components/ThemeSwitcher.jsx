import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext.jsx";

const labels = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function ThemeSwitcher({ compact = false }) {
  const { themePreference, setThemePreference } = useTheme();

  return (
    <div className={`theme-switcher ${compact ? "compact" : ""}`} aria-label="Theme preference">
      {Object.entries(labels).map(([value, label]) => {
        const Icon = icons[value];
        return (
          <button
            aria-label={`${label} theme`}
            aria-pressed={themePreference === value}
            className={themePreference === value ? "active" : ""}
            key={value}
            onClick={() => setThemePreference(value)}
            title={`${label} theme`}
            type="button"
          >
            <Icon aria-hidden="true" size={16} />
            {!compact && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
