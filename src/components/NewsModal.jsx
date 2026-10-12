import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import { newsCategories, thaiDate } from '../data/school'
import { asset } from '../lib/asset'

export default function NewsModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <motion.div
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.1fr_1fr]"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[45vh] overflow-auto bg-azure-50 md:max-h-[90vh]">
              {item.image ? (
                <img src={asset(item.image)} alt="" className="w-full" />
              ) : (
                <div className="bg-brand grid aspect-[3/4] place-items-center p-10 text-center font-display text-2xl text-white">
                  {item.title}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 overflow-auto p-6 md:p-8">
              <span className="self-start rounded-full bg-saffron-50 px-3 py-1 font-display text-sm text-saffron-600">
                {newsCategories.find((c) => c.id === item.category)?.label}
              </span>
              <h3 className="text-2xl leading-snug font-bold text-ink">{item.title}</h3>
              <div className="flex items-center gap-2 text-azure-700">
                <CalendarDays className="size-4" /> โพสต์เมื่อ {thaiDate(item.date)}
              </div>
              <p className="text-ink/70">
                อ่านรายละเอียดฉบับเต็มและเอกสารแนบได้ที่เว็บไซต์ประชาสัมพันธ์ของโรงเรียน
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="bg-brand mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-white shadow-lg shadow-saffron-500/30 transition hover:brightness-110"
              >
                อ่านข่าวฉบับเต็ม <ExternalLink className="size-4" />
              </a>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:rotate-90 hover:bg-saffron-500 hover:text-white"
              aria-label="ปิด"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
