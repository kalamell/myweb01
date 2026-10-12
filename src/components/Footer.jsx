import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { identity, partners, school } from '../data/school'
import { navItems } from './Navbar'
import { FacebookIcon, Wave } from './ui'

export default function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-ink text-azure-100">
      <Wave className="absolute inset-x-0 -top-px h-12 w-full rotate-180 text-white" />
      <div className="absolute -bottom-32 -left-32 -z-10 size-96 rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="absolute -top-20 right-0 -z-10 size-96 rounded-full bg-azure-500/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-24 pb-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <img src={school.logo} alt="" className="h-20 w-auto" />
            <div>
              <div className="font-display text-xl font-semibold text-white">{school.name}</div>
              <div className="text-sm text-azure-300">{school.office}</div>
            </div>
          </div>
          <p className="mt-6 max-w-md font-display text-2xl text-white">
            “{identity.philosophyPali}”
            <span className="mt-1 block text-base text-saffron-300">{identity.philosophy}</span>
          </p>
          <div className="mt-6 flex gap-2">
            <span className="h-2 w-14 rounded-full bg-saffron-500" />
            <span className="h-2 w-14 rounded-full bg-azure-500" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">เมนู</h3>
          <ul className="space-y-2">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition hover:pl-1 hover:text-saffron-300">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">ติดต่อ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-saffron-400" /> {school.address}
            </li>
            <li>
              <a href={`tel:${school.phoneRaw}`} className="flex gap-2 hover:text-saffron-300">
                <Phone className="size-4 text-saffron-400" /> {school.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${school.email}`} className="flex gap-2 hover:text-saffron-300">
                <Mail className="size-4 text-saffron-400" /> {school.email}
              </a>
            </li>
            <li>
              <a href={school.facebook} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-saffron-300">
                <FacebookIcon className="size-4 text-saffron-400" /> Facebook โรงเรียน
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {partners.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noreferrer" className="text-azure-300 hover:text-white">
                {p.label}
              </a>
            ))}
          </div>
          <p className="text-azure-300">© {new Date().getFullYear() + 543} {school.name}</p>
        </div>
      </div>
    </footer>
  )
}
