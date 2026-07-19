import React from 'react'

interface ThemeToggleProps {
  isDark: boolean
  toggleTheme: () => void
}

export function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <label className="flex items-center" aria-label="Toggle dark mode">
      <input
        type="checkbox"
        className="theme-checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className="theme-slider"></div>
    </label>
  )
}
