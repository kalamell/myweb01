import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, FileText } from 'lucide-react'
import { newsCategories, thaiDate } from '../data/school'
import { fadeUp } from './ui'

const catLabel = (id) => newsCategories.find((c) => c.id === id)?.label ?? ''

export default function NewsCard({ item, onOpen, featured = false }) {
  return (
    <motion.article
      variants={fadeUp}
      layout
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-azure-900/5 ring-1 ring-azure-100 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onClick={() => onOpen?.(item)}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-saffron-100 to-azure-100 ${featured ? 'aspect-[4/3] md:aspect-auto md:flex-1' : 'aspect-[4/3]'}`}>
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <FileText className="size-16 text-azure-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-medium text-saffron-600 shadow backdrop-blur">
          {catLabel(item.category)}
        </span>
        <span className="absolute right-4 bottom-4 grid size-10 translate-y-4 place-items-center rounded-full bg-saffron-500 text-white opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-1.5 text-sm text-azure-700">
          <CalendarDays className="size-4" />
          {thaiDate(item.date)}
        </div>
        <h3 className={`font-display leading-snug font-semibold text-ink transition-colors group-hover:text-saffron-600 ${featured ? 'text-xl md:text-2xl' : 'line-clamp-3 text-lg'}`}>
          {item.title}
        </h3>
      </div>
    </motion.article>
  )
}
