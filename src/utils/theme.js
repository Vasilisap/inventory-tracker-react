const THEME_KEY = "inventory-theme";

export function getInitialTheme() {
  // Protect against SSR or non-browser environments
  if (typeof window === "undefined") return "light";

  // 1. Check saved theme in localStorage
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;

  // 2. Fall back to system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function saveTheme(theme) {
  window.localStorage.setItem(THEME_KEY, theme);
}
