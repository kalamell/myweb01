import { motion } from 'framer-motion'
import { BarChart3, Clapperboard, Newspaper, Terminal } from 'lucide-react'
import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { PageHero, Reveal, SectionHeading } from '../components/ui'

const clips = [
  {
    id: 'intro',
    title: 'แนะนำโรงเรียน อ.ส.ช.',
    desc: 'โลโก้ ปรัชญา “ปญฺญา โลกสฺมิ ปชฺโชโต” ตัวเลขสำคัญ และอัตลักษณ์ “แจ่มใส ไหว้งาม”',
    icon: Clapperboard,
    composition: 'SchoolIntro',
  },
  {
    id: 'newsReel',
    title: 'จดหมายข่าว อ.ส.ช.',
    desc: 'สไลด์ข่าวเด่นพร้อมทรานซิชัน สร้างจากข้อมูลข่าวโดยอัตโนมัติ',
    icon: Newspaper,
    composition: 'NewsReel',
  },
  {
    id: 'stats',
    title: 'ข้อมูลนักเรียน 2569',
    desc: 'กราฟแท่งเคลื่อนไหวแสดงจำนวนนักเรียนชาย-หญิงแต่ละระดับชั้น',
    icon: BarChart3,
    composition: 'StudentStats',
  },
]

export default function Media() {
  const [current, setCurrent] = useState(clips[0])

  return (
    <>
      <PageHero
        eyebrow="วิดีโอ · Remotion"
        title="สื่อประชาสัมพันธ์แบบโมชันกราฟิก"
        desc="วิดีโอทุกชิ้นในหน้านี้เขียนด้วย React ผ่าน Remotion — แก้ข้อมูลครั้งเดียว ได้ทั้งบนเว็บและไฟล์ MP4 สำหรับโซเชียลมีเดีย"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <motion.div key={current.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl bg-ink shadow-2xl ring-1 ring-azure-100">
              <VideoPlayer video={current.id} autoPlay />
            </motion.div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold">{current.title}</h2>
              <p className="mt-1 text-ink/70">{current.desc}</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {clips.map((c, i) => {
              const Ico = c.icon
              const active = c.id === current.id
              return (
                <Reveal key={c.id} delay={i * 0.08}>
                  <button
                    type="button"
                    onClick={() => setCurrent(c)}
                    className={`flex w-full items-start gap-4 rounded-2xl p-4 text-left transition ${
                      active ? 'bg-brand text-white shadow-lg shadow-saffron-500/30' : 'bg-white ring-1 ring-azure-100 hover:ring-saffron-300'
                    }`}
                  >
                    <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${active ? 'bg-white/20' : 'bg-saffron-50 text-saffron-500'}`}>
                      <Ico className="size-6" />
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold">{c.title}</span>
                      <span className={`text-sm ${active ? 'text-white/85' : 'text-ink/60'}`}>{c.desc}</span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <SectionHeading eyebrow="สำหรับผู้ดูแลเว็บ" title="เรนเดอร์เป็นไฟล์วิดีโอ" />
        <Reveal className="overflow-hidden rounded-3xl bg-ink text-azure-100 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-sm">
            <Terminal className="size-4 text-saffron-400" /> terminal
          </div>
          <pre className="overflow-x-auto p-6 text-sm leading-7">
            <code>
              <span className="text-azure-400"># เปิด Remotion Studio เพื่อแก้ไข/พรีวิว</span>
              {'\n'}npm run remotion:studio
              {'\n\n'}
              <span className="text-azure-400"># เรนเดอร์ MP4 ({current.composition})</span>
              {'\n'}npx remotion render src/remotion/index.js {current.composition} out/{current.composition}.mp4
            </code>
          </pre>
        </Reveal>
      </section>
    </>
  )
}
