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
    <>
      {/* Header bar — always on top */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-page/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-extrabold tracking-tight text-text-primary relative z-[60]"
            onClick={handleNavClick}
          >
            {site.logo}
          </a>

          {/* Desktop: 3D Pill Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <PillNav activeSection={activeSection} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 relative z-[60]">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            <div className="hidden sm:inline-block">
              <FlowButton text="LET'S TALK" href="#contact" onClick={handleNavClick} />
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary lg:hidden transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="mobile-menu-nav">
            {site.nav.map((item, index) => {
              const id = navHrefToId(item.href)
              const isActive = activeSection === id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="mobile-menu-link"
                  style={{
                    animationDelay: `${index * 0.07}s`,
                    opacity: isActive ? 1 : 0.75,
                  }}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mobile-menu-cta"
              style={{ animationDelay: `${site.nav.length * 0.07}s` }}
            >
              LET'S TALK
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
