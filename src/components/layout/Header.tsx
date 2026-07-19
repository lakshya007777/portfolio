import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '../../data/site'
import { PillNav } from './PillNav'
import { ThemeToggle } from '../ui/ThemeToggle'
import { FlowButton } from '../ui/FlowButton'

type HeaderProps = {
  activeSection: string
  isDark: boolean
  toggleTheme: () => void
}

export function Header({ activeSection, isDark, toggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  const navHrefToId = (href: string) => href.replace('#', '')

  return (
    <header className="sticky top-0 z-50 bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-extrabold tracking-tight text-text-primary"
          onClick={handleNavClick}
        >
          {site.logo}
        </a>

        {/* Desktop: 3D Pill Navigation */}
        <div className="hidden lg:flex items-center justify-center">
          <PillNav activeSection={activeSection} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          
          <div className="hidden sm:inline-block">
            <FlowButton text="LET'S TALK" href="#contact" onClick={handleNavClick} />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-surface text-text-primary lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[65px] z-40 bg-page lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1 px-4 py-6">
            {site.nav.map((item) => {
              const id = navHrefToId(item.href)
              const isActive = activeSection === id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`rounded-xl px-4 py-4 text-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-surface text-accent shadow-sm'
                      : 'text-text-primary hover:bg-surface/60'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <div className="mt-4">
              <FlowButton text="LET'S TALK" href="#contact" onClick={handleNavClick} className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
