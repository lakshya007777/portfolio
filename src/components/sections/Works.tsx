import { ExternalLink } from 'lucide-react'
import { site } from '../../data/site'

export function Works() {
  const projects = site.projects

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

        {/* Card Grid */}
        {/* Card Marquee */}
        <div className="works-marquee">
          <div className="works-marquee-group">
            {projects.map((project, i) => (
              <div
                key={`${project.title}-1`}
                className="work-card"
                style={{ '--card-bg': project.bgColor } as React.CSSProperties}
              >
                {/* Thumbnail (always visible) */}
                <div className="work-card-thumb">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-card-thumb-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Expanded content (revealed on hover) */}
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
            ))}
          </div>
          <div className="works-marquee-group" aria-hidden="true">
            {projects.map((project, i) => (
              <div
                key={`${project.title}-2`}
                className="work-card"
                style={{ '--card-bg': project.bgColor } as React.CSSProperties}
              >
                {/* Thumbnail (always visible) */}
                <div className="work-card-thumb">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-card-thumb-img"
                    loading="lazy"
                  />
                </div>

                {/* Expanded content (revealed on hover) */}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
