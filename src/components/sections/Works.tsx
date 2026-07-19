import { useState, useRef, useCallback, useEffect } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { site } from '../../data/site'
import type { Project } from '../../data/site'

export function Works() {
  const projects = site.projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isTouching, setIsTouching] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<number | null>(null)
  const scrollSpeedRef = useRef(0.5) // pixels per frame

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Auto-scroll for mobile swipeable view
  useEffect(() => {
    if (!isMobile || isTouching || selectedProject) return
    const el = scrollRef.current
    if (!el) return

    const animate = () => {
      el.scrollLeft += scrollSpeedRef.current
      // Loop back to start when reaching the end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0
      }
      autoScrollRef.current = requestAnimationFrame(animate)
    }

    autoScrollRef.current = requestAnimationFrame(animate)
    return () => {
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current)
    }
  }, [isMobile, isTouching, selectedProject])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const handleCardClick = useCallback((project: Project) => {
    if (window.matchMedia('(hover: none)').matches) {
      setSelectedProject(project)
    }
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsTouching(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false)
  }, [])

  const renderCard = (project: Project, keyPrefix: string, index: number) => (
    <div
      key={`${project.title}-${keyPrefix}`}
      className={isMobile ? 'work-card work-card-mobile' : 'work-card'}
      style={{ '--card-bg': project.bgColor } as React.CSSProperties}
      onClick={() => handleCardClick(project)}
    >
      {/* Thumbnail (always visible) */}
      <div className="work-card-thumb">
        <img
          src={project.image}
          alt={project.title}
          className="work-card-thumb-img"
          loading={keyPrefix === '1' && index < 3 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Mobile: show title overlay */}
      {isMobile && (
        <div className="work-card-mobile-label">
          <span>{project.title}</span>
        </div>
      )}

      {/* Expanded content (revealed on hover — desktop only) */}
      <div className="work-card-expanded">
        <div className="work-card-info">
          <h3 className="work-card-title">{project.title}</h3>
          <div className="work-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="work-card-tag">
                {tag}
              </span>
            ))}
          </div>
          <p className="work-card-desc">{project.description}</p>
          <a
            href={project.href}
            className="work-card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View project <ExternalLink size={13} />
          </a>
        </div>
        <div className="work-card-preview">
          <img
            src={project.image}
            alt={project.title}
            className="work-card-preview-img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )

  return (
    <section id="works" className="works-section">
      <div className="works-container">
        {/* Section Header */}
        <div className="works-header">
          <h2 className="works-title">My Work</h2>
          <p className="works-subtitle">
            A glimpse of recent projects across design and development.
          </p>
        </div>

        {/* Mobile: Swipeable horizontal scroll */}
        {isMobile && (
          <div
            ref={scrollRef}
            className="works-scroll"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {projects.map((project, i) => renderCard(project, '1', i))}
            {/* Duplicate for seamless loop */}
            {projects.map((project, i) => renderCard(project, '2', i))}
          </div>
        )}

        {/* Desktop: CSS Marquee */}
        {!isMobile && (
          <div
            ref={marqueeRef}
            className="works-marquee"
          >
            <div className="works-marquee-group">
              {projects.map((project, i) => renderCard(project, '1', i))}
            </div>
            <div className="works-marquee-group" aria-hidden="true">
              {projects.map((project, i) => renderCard(project, '2', i))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Project Modal */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            {/* Project image */}
            <div className="project-modal-image">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
              />
            </div>

            {/* Project info */}
            <div className="project-modal-content">
              <h3 className="project-modal-title">{selectedProject.title}</h3>
              <div className="project-modal-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="work-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="project-modal-desc">{selectedProject.description}</p>
              <a
                href={selectedProject.href}
                className="project-modal-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View project <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
