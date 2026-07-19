import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { Works } from './components/sections/Works'
import { Services } from './components/sections/Services'
import { About } from './components/sections/About'
import { GitHubContributions } from './components/sections/GitHubContributions'

const sectionIds = ['home', 'works', 'services', 'about', 'github', 'contact'] as const

function App() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isDark, setIsDark] = useState<boolean>(false)

  const toggleTheme = () => setIsDark(!isDark)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <Header activeSection={activeSection} isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Works />
        <Services />
        <About />
        <GitHubContributions />
      </main>
      <Footer />
    </>
  )
}

export default App
