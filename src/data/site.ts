export const site = {
  logo: 'laksh.',
  name: 'LAKSHYA KUMAR SINGH',
  greeting: "Hello, I'm",
  tagline: 'DEVELOPER • CREATOR • INNOVATOR',
  bio: 'Building products, solving problems, and learning every day. Exploring the future of web development, game design, and technology.',
  email: 'lakshya@example.com',
  portrait: '/portrait.png',
  socials: [
    { label: 'Email', href: 'mailto:lakshya@example.com', type: 'email' as const },
    { label: 'LinkedIn', href: 'https://linkedin.com', type: 'linkedin' as const },
    { label: 'GitHub', href: 'https://github.com', type: 'github' as const },
    { label: 'Behance', href: 'https://behance.net', type: 'behance' as const },
  ],
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'My Work', href: '#works' },
  ],
  serviceCards: [
    {
      title: '2D Game Developer',
      icon: 'gamepad',
      gradient: 'from-violet-500 to-fuchsia-500',
      accent: '#8b5cf6',
    },
    {
      title: 'App Developer',
      icon: 'smartphone',
      gradient: 'from-cyan-400 to-blue-500',
      accent: '#06b6d4',
    },
    {
      title: 'Web Developer',
      icon: 'globe',
      gradient: 'from-emerald-400 to-teal-500',
      accent: '#10b981',
    },
  ],
  services: [
    {
      title: '2D Game Development',
      description:
        'Immersive 2D game experiences with custom mechanics, pixel-perfect graphics, and smooth animations — from concept to launch.',
    },
    {
      title: 'App Development',
      description:
        'Native and cross-platform mobile apps with React Native, Flutter, and Swift — polished and performant.',
    },
    {
      title: 'Web Development',
      description:
        'Fast, accessible web apps with React, TypeScript, and modern tooling — from MVP to production.',
    },
  ],
  projects: [
    {
      title: 'Netflix Clone',
      description: 'A complete clone of the Netflix web interface featuring movie browsing, trailers, and a responsive design.',
      tags: ['Web', 'React', 'Clone'],
      image: '/Netflix clone.png',
      href: '#',
      bgColor: '#e8eaed',
    },
    {
      title: 'BumblebEEs',
      description: 'An interactive application named BumblebEEs with engaging user experience and design.',
      tags: ['App', 'UI/UX'],
      image: '/BumblebEEs.png',
      href: '#',
      bgColor: '#fef3c7',
    },
    {
      title: 'Deadline Guardian AI',
      description: 'An AI-powered application to help manage deadlines and track tasks efficiently.',
      tags: ['AI', 'Productivity'],
      image: '/Deadline guardian Ai.png',
      href: '#',
      bgColor: '#d1fae5',
    },
    {
      title: 'Fairness Audit',
      description: 'A comprehensive tool designed to audit systems and algorithms for fairness and bias.',
      tags: ['Audit', 'Tool'],
      image: '/FairnessAudit.png',
      href: '#',
      bgColor: '#dbeafe',
    },
    {
      title: 'Weather-Enhanced Stopwatch',
      description: 'A visually appealing, nature-inspired stopwatch application that incorporates real-time weather information.',
      tags: ['Web', 'Design'],
      image: '/stopwatch.png',
      href: '#',
      bgColor: '#fce7f3',
    },
  ],
  about: {
    title: 'About',
    subtitle: 'Designer & developer crafting thoughtful digital experiences.',
    longBio:
      'I blend visual design with front-end development to ship products that look great and work flawlessly. From early sketches to production-ready React apps, I enjoy collaborating with teams and turning ideas into interfaces people love.',
    skills: [
      'Figma',
      'UI/UX',
      'React',
      'TypeScript',
      'Tailwind CSS',
      '3D Design',
      'Prototyping',
      'Design Systems',
    ],
    stats: [
      { value: '3+', label: 'Years experience' },
      { value: '30+', label: 'Projects Completed' },
      { value: '25+', label: 'Hackathons Participated' },
    ],
  },
} as const
