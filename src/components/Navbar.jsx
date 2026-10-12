import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { school } from '../data/school'
import { FacebookIcon } from './ui'

export const navItems = [
  { to: '/', label: 'หน้าแรก' },
  { to: '/about', label: 'เกี่ยวกับโรงเรียน' },
  { to: '/academics', label: 'วิชาการ' },
  { to: '/news', label: 'ข่าวประชาสัมพันธ์' },
  { to: '/media', label: 'วิดีโอ' },
  { to: '/contact', label: 'ติดต่อเรา' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`hidden overflow-hidden bg-ink text-xs text-azure-100 transition-all duration-300 md:block ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span className="truncate">{school.office}</span>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`tel:${school.phoneRaw}`} className="flex items-center gap-1.5 hover:text-saffron-300">
              <Phone className="size-3.5" /> {school.phone}
            </a>
            <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 hover:text-saffron-300">
              <Mail className="size-3.5" /> {school.email}
            </a>
            <a href={school.facebook} target="_blank" rel="noreferrer" className="hover:text-saffron-300" aria-label="Facebook">
              <FacebookIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white/85 shadow-lg shadow-azure-900/5 backdrop-blur-xl' : 'bg-white/75 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex min-w-0 items-center gap-3">
            <motion.img
              src={school.logo}
              alt="ตราสัญลักษณ์โรงเรียน"
              className="h-12 w-auto shrink-0 drop-shadow"
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-base font-semibold text-ink sm:text-lg">{school.name}</div>
              <div className="truncate text-xs text-azure-700">{school.nameEn}</div>
            </div>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative isolate rounded-full px-4 py-2 font-display text-[15px] transition-colors ${
                      isActive ? 'text-white' : 'text-ink/80 hover:text-saffron-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="bg-brand absolute inset-0 -z-10 rounded-full shadow-md shadow-saffron-500/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-saffron-50 text-saffron-600 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="เปิดเมนู"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-azure-100 bg-white px-4 lg:hidden"
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `my-1 block rounded-xl px-4 py-3 font-display ${
                        isActive ? 'bg-brand text-white' : 'text-ink hover:bg-saffron-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="flex gap-3 py-4 text-sm text-azure-700">
                <a href={`tel:${school.phoneRaw}`} className="flex items-center gap-1.5">
                  <Phone className="size-4" /> {school.phone}
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
