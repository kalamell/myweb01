import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import {
  Atom,
  BookOpen,
  Calculator,
  CalendarDays,
  Circle,
  ClipboardList,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Languages,
  Library,
  Palette,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 32, x = 0, className = '', as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Comp>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export function SectionHeading({ eyebrow, title, desc, align = 'center', light = false }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'
  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1 font-display text-sm font-medium ${
            light ? 'bg-white/15 text-white' : 'bg-saffron-50 text-saffron-600'
          }`}
        >
          <span className="size-1.5 animate-pulse rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl leading-tight font-bold sm:text-4xl md:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {desc && <p className={`text-lg ${light ? 'text-white/80' : 'text-ink/65'}`}>{desc}</p>}
    </Reveal>
  )
}

const iconMap = {
  Atom,
  BookOpen,
  Calculator,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Languages,
  Library,
  Palette,
}

export function Icon({ name, ...props }) {
  const Cmp = iconMap[name] ?? Circle
  return <Cmp {...props} />
}

// lucide-react ไม่มีไอคอนแบรนด์แล้ว จึงวาด Facebook เอง
export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  )
}

export function Counter({ to, duration = 2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => Math.round(v).toLocaleString('th-TH'))

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, to, duration, value])

  return <motion.span ref={ref} className={className}>{text}</motion.span>
}

export function PageHero({ eyebrow, title, desc, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-36 pb-20 text-white md:pt-44 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-saffron-500),transparent_55%),radial-gradient(ellipse_at_bottom_right,var(--color-azure-500),transparent_55%)] opacity-90" />
      <div className="absolute -top-24 -right-24 -z-10 size-96 animate-spin-slow rounded-full border-[40px] border-dashed border-white/10" />
      <div className="absolute bottom-0 left-1/3 -z-10 size-40 animate-float rounded-full bg-azure-400/30 blur-2xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full bg-white/15 px-4 py-1 font-display text-sm backdrop-blur"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
          className="mt-4 max-w-4xl text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {desc && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
            className="mt-5 max-w-2xl text-lg text-white/80"
          >
            {desc}
          </motion.p>
        )}
        {children}
      </div>
      <Wave className="absolute inset-x-0 -bottom-px text-white" />
    </section>
  )
}

export function Wave({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0,48 C180,80 360,80 540,56 C720,32 900,0 1080,8 C1260,16 1350,40 1440,48 L1440,80 L0,80 Z"
      />
    </svg>
  )
}
