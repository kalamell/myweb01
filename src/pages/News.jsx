import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import NewsCard from '../components/NewsCard'
import NewsModal from '../components/NewsModal'
import VideoPlayer from '../components/VideoPlayer'
import { newsReelDuration } from '../remotion/compositions/NewsReel'
import { PageHero, Reveal, SectionHeading } from '../components/ui'
import { news, newsCategories } from '../data/school'

const tabs = [{ id: 'all', label: 'ทั้งหมด' }, ...newsCategories]
const reelItems = news.filter((n) => n.category === 'pr' && n.image)
const reelProps = { items: reelItems, label: 'ข่าวประชาสัมพันธ์' }

export default function News() {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)

  const list = useMemo(
    () =>
      news
        .filter((n) => tab === 'all' || n.category === tab)
        .filter((n) => n.title.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [tab, query],
  )

  return (
    <>
      <PageHero eyebrow="ข่าวประชาสัมพันธ์" title="ข่าวสาร กิจกรรม และประกาศของโรงเรียน" desc="รวมจดหมายข่าว อ.ส.ช. ข่าวประชาสัมพันธ์ การจัดซื้อ-จัดจ้าง และงานสนองนโยบาย ไว้ในที่เดียว" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="sticky top-[76px] z-30 -mx-4 mb-10 flex flex-col gap-4 bg-white/85 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:shadow-lg sm:ring-1 sm:ring-azure-100 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 rounded-full px-5 py-2 font-display text-sm transition ${tab === t.id ? 'text-white' : 'text-ink/70 hover:text-saffron-600'}`}
              >
                {tab === t.id && <motion.span layoutId="news-tab" className="bg-brand absolute inset-0 rounded-full shadow-md shadow-saffron-500/30" />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full bg-azure-50 px-4 py-2 ring-1 ring-azure-100 focus-within:ring-saffron-400 md:w-72">
            <Search className="size-4 text-azure-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาข่าว..."
              className="w-full bg-transparent outline-none placeholder:text-ink/40"
            />
          </label>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <NewsCard item={n} onOpen={setActive} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-20 text-center text-ink/50">ไม่พบข่าวที่ค้นหา</p>}
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="News Reel" title="สรุปข่าวประชาสัมพันธ์แบบวิดีโอ" desc="สร้างด้วย Remotion จากข้อมูลข่าวชุดเดียวกันกับด้านบน" />
        <Reveal className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-azure-100">
          <VideoPlayer
            video="newsReel"
            inputProps={reelProps}
            durationInFrames={newsReelDuration(reelItems.length)}
          />
        </Reveal>
      </section>

      <NewsModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
