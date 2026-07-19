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
    <header className={`sticky top-0 z-50 backdrop-blur-md ${menuOpen ? 'bg-page' : 'bg-page/80'}`}>
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden overflow-y-auto"
          style={{
            height: 'calc(100vh - 65px)',
            backgroundColor: 'var(--color-page)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-2 px-5 py-8" style={{ animation: 'mobileMenuSlideIn 0.3s ease-out' }}>
            {site.nav.map((item, index) => {
              const id = navHrefToId(item.href)
              const isActive = activeSection === id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="mobile-nav-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    fontSize: '1.1rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                    boxShadow: isActive ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                    border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    animation: `mobileNavItemIn 0.35s ease-out ${index * 0.06}s both`,
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {item.label}
                </a>
              )
            })}
            <div className="mt-6" style={{ animation: `mobileNavItemIn 0.35s ease-out ${site.nav.length * 0.06}s both` }}>
              <FlowButton text="LET'S TALK" href="#contact" onClick={handleNavClick} className="w-full justify-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
