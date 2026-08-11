import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "dharaone-theme";
const themeOptions = ["light", "dark", "system"];

function getInitialPreference() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return themeOptions.includes(stored) ? stored : "system";
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [themePreference, setThemePreferenceState] = useState(getInitialPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setSystemTheme(event.matches ? "dark" : "light");

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themePreference = themePreference;
    window.localStorage.setItem(STORAGE_KEY, themePreference);
  }, [resolvedTheme, themePreference]);

  const value = useMemo(
    () => ({
      themePreference,
      resolvedTheme,
      setThemePreference: (nextTheme) => {
        if (themeOptions.includes(nextTheme)) {
          setThemePreferenceState(nextTheme);
        }
      },
      themeOptions,
    }),
    [resolvedTheme, themePreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
