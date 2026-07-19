import { useEffect, useState, useCallback } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { FlowButton } from '../ui/FlowButton'

const GITHUB_USERNAME = 'lakshya007777'
const WEEKS_TO_SHOW = 52

type DayData = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type WeekData = DayData[]

type ContributionStats = {
  totalContributions: number
  currentStreak: number
  longestStreak: number
  bestDay: { date: string; count: number }
}

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (max === 0) return 0
  const ratio = count / max
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getMonthLabels(weeks: WeekData[]): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = []
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  let lastMonth = -1

  weeks.forEach((week, colIdx) => {
    if (week.length === 0) return
    const firstDay = new Date(week[0].date + 'T00:00:00')
    const month = firstDay.getMonth()
    if (month !== lastMonth) {
      lastMonth = month
      labels.push({ label: months[month], col: colIdx })
    }
  })

  return labels
}

function computeStats(weeks: WeekData[]): ContributionStats {
  let total = 0
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let bestDay = { date: '', count: 0 }

  const allDays: DayData[] = weeks.flat().sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (const day of allDays) {
    total += day.count
    if (day.count > bestDay.count) {
      bestDay = { date: day.date, count: day.count }
    }
    if (day.count > 0) {
      tempStreak++
      if (tempStreak > longestStreak) longestStreak = tempStreak
    } else {
      tempStreak = 0
    }
  }

  // Current streak: count backwards from today
  for (let i = allDays.length - 1; i >= 0; i--) {
    const dayDate = new Date(allDays[i].date + 'T00:00:00')
    if (dayDate > today) continue
    if (allDays[i].count > 0) {
      currentStreak++
    } else {
      break
    }
  }

  return { totalContributions: total, currentStreak, longestStreak, bestDay }
}

async function fetchContributions(): Promise<WeekData[]> {
  // Use GitHub's contribution calendar from the profile page via a proxy/scraping approach
  // We'll use the GitHub contributions API endpoint
  const endDate = new Date()
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)

  try {
    // Fetch from GitHub's GraphQL-like contribution endpoint via github-contributions-api
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    )

    if (!response.ok) throw new Error('API failed')

    const data = await response.json()
    const contributions: { date: string; count: number; level: number }[] =
      data.contributions || []

    // Group into weeks
    const weeks: WeekData[] = []
    let currentWeek: DayData[] = []
    let maxCount = 0

    for (const c of contributions) {
      if (c.count > maxCount) maxCount = c.count
    }

    for (const c of contributions) {
      const dayOfWeek = new Date(c.date + 'T00:00:00').getDay()

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      currentWeek.push({
        date: c.date,
        count: c.count,
        level: getLevel(c.count, maxCount),
      })
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    // Only keep last N weeks
    return weeks.slice(-WEEKS_TO_SHOW)
  } catch {
    // Fallback: return empty
    return []
  }
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const LEVEL_COLORS = {
  light: [
    'rgb(235, 237, 240)',    // level 0
    'rgb(155, 210, 155)',    // level 1
    'rgb(87, 166, 87)',      // level 2
    'rgb(40, 130, 40)',      // level 3
    'rgb(20, 83, 20)',       // level 4
  ],
  dark: [
    'rgb(30, 35, 40)',       // level 0
    'rgb(14, 68, 41)',       // level 1
    'rgb(0, 109, 50)',       // level 2
    'rgb(38, 166, 65)',      // level 3
    'rgb(57, 211, 83)',      // level 4
  ],
}

export function GitHubContributions() {
  const [weeks, setWeeks] = useState<WeekData[]>([])
  const [stats, setStats] = useState<ContributionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)

  // Detect dark mode
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchContributions()
      if (data.length === 0) {
        setError(true)
      } else {
        setWeeks(data)
        setStats(computeStats(data))
        setLastSynced(new Date())
      }
    } catch {
      setError(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Auto-sync every 5 minutes
  useEffect(() => {
    const interval = setInterval(loadData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [loadData])

  const cellSize = 13
  const cellGap = 3
  const totalCellSize = cellSize + cellGap
  const labelWidth = 36
  const topPadding = 24

  const monthLabels = getMonthLabels(weeks)
  const colors = isDark ? LEVEL_COLORS.dark : LEVEL_COLORS.light

  const svgWidth = labelWidth + weeks.length * totalCellSize + 8
  const svgHeight = topPadding + 7 * totalCellSize + 4

  const handleCellHover = (
    day: DayData,
    e: React.MouseEvent<SVGRectElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const container = e.currentTarget
      .closest('.github-graph-container')
      ?.getBoundingClientRect()
    if (!container) return

    setTooltip({
      text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`,
      x: rect.left - container.left + rect.width / 2,
      y: rect.top - container.top - 8,
    })
  }

  return (
    <section
      id="github"
      className="bg-page py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="GitHub Activity"
            subtitle="My open-source contributions over the past year — synced live from GitHub."
          />
          <div className="flex items-center gap-3">
            {lastSynced && (
              <span className="text-xs text-text-secondary">
                Synced {lastSynced.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={loadData}
              disabled={loading}
              className="group flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-all hover:border-accent hover:text-accent disabled:opacity-50"
              aria-label="Refresh contributions"
            >
              <svg
                className={`h-3.5 w-3.5 transition-transform ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Sync
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          {/* Stats Row */}
          {stats && !loading && (
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="github-stat-card rounded-xl border border-border bg-page p-4 transition-all hover:border-accent/30 hover:shadow-md">
                <p className="text-2xl font-extrabold text-accent">
                  {stats.totalContributions.toLocaleString()}
                </p>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Total Contributions
                </p>
              </div>
              <div className="github-stat-card rounded-xl border border-border bg-page p-4 transition-all hover:border-accent/30 hover:shadow-md">
                <p className="text-2xl font-extrabold text-accent">
                  {stats.currentStreak}
                </p>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Current Streak
                </p>
              </div>
              <div className="github-stat-card rounded-xl border border-border bg-page p-4 transition-all hover:border-accent/30 hover:shadow-md">
                <p className="text-2xl font-extrabold text-accent">
                  {stats.longestStreak}
                </p>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Longest Streak
                </p>
              </div>
              <div className="github-stat-card rounded-xl border border-border bg-page p-4 transition-all hover:border-accent/30 hover:shadow-md">
                <p className="text-2xl font-extrabold text-accent">
                  {stats.bestDay.count}
                </p>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Best Day
                </p>
              </div>
            </div>
          )}

          {/* Contribution Graph */}
          {loading && weeks.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-8 w-8 animate-spin text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <p className="text-sm text-text-secondary">
                  Fetching contributions…
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <p className="text-sm text-text-secondary">
                Unable to load contributions.
              </p>
              <FlowButton text="Retry" onClick={loadData} />
            </div>
          ) : (
            <div
              className="github-graph-container relative overflow-x-auto scrollbar-hide"
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Tooltip */}
              {tooltip && (
                <div
                  className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg bg-text-primary px-3 py-1.5 text-xs font-medium text-page shadow-lg"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {tooltip.text}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-text-primary" />
                </div>
              )}

              <svg
                width={svgWidth}
                height={svgHeight}
                className="mx-auto block"
                role="img"
                aria-label="GitHub contribution graph"
              >
                {/* Month labels */}
                {monthLabels.map((m, i) => (
                  <text
                    key={i}
                    x={labelWidth + m.col * totalCellSize}
                    y={14}
                    className="fill-text-secondary"
                    fontSize="11"
                    fontFamily="var(--font-sans)"
                  >
                    {m.label}
                  </text>
                ))}

                {/* Day labels */}
                {DAY_LABELS.map((label, i) =>
                  label ? (
                    <text
                      key={i}
                      x={0}
                      y={topPadding + i * totalCellSize + cellSize - 2}
                      className="fill-text-secondary"
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                    >
                      {label}
                    </text>
                  ) : null
                )}

                {/* Cells */}
                {weeks.map((week, colIdx) =>
                  week.map((day) => {
                    const dayOfWeek = new Date(
                      day.date + 'T00:00:00'
                    ).getDay()
                    return (
                      <rect
                        key={day.date}
                        x={labelWidth + colIdx * totalCellSize}
                        y={topPadding + dayOfWeek * totalCellSize}
                        width={cellSize}
                        height={cellSize}
                        rx={3}
                        ry={3}
                        fill={colors[day.level]}
                        className="github-cell cursor-pointer transition-all duration-150"
                        onMouseEnter={(e) => handleCellHover(day, e)}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          stroke:
                            day.level > 0
                              ? 'rgba(0,0,0,0.04)'
                              : 'transparent',
                          strokeWidth: 1,
                        }}
                      />
                    )
                  })
                )}
              </svg>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-secondary">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: colors[level as 0 | 1 | 2 | 3 | 4] }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          )}

          {/* GitHub Profile Link */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-6">
            <svg
              className="h-5 w-5 text-text-secondary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
