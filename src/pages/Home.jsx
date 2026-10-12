import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Megaphone, Play, Quote, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import NewsModal from '../components/NewsModal'
import VideoPlayer from '../components/VideoPlayer'
import { Counter, Icon, Reveal, SectionHeading, Wave, fadeUp, stagger } from '../components/ui'
import { director, gallery, identity, news, programs, quickLinks, school, stats } from '../data/school'

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const words = ['ปัญญา', 'เป็นแสงสว่าง', 'ในโลก']

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-gradient-to-br from-saffron-50 via-white to-azure-50 pt-32 pb-28 md:pt-40">
      <div className="bg-dots absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -top-40 -left-40 -z-10 size-[520px] animate-float-slow rounded-full bg-saffron-300/40 blur-3xl" />
      <div className="absolute top-20 -right-40 -z-10 size-[520px] animate-float rounded-full bg-azure-300/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-display text-sm text-saffron-600 shadow-md shadow-saffron-500/10 ring-1 ring-saffron-100"
          >
            <Sparkles className="size-4" /> ยินดีต้อนรับสู่ {school.short} · ก่อตั้ง พ.ศ. {school.founded}
          </motion.span>

          <h1 className="mt-6 text-5xl leading-[1.1] font-extrabold text-ink sm:text-6xl xl:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={`mr-3 inline-block ${i === 1 ? 'text-gradient animate-shimmer' : ''}`}
                initial={{ opacity: 0, y: 50, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-lg text-ink/70"
          >
            {school.name} มุ่งสู่องค์กรแห่งนวัตกรรม จัดการศึกษาตามแนวทางพหุปัญญา ให้ผู้เรียนเป็นเลิศรอบด้าน
            “{identity.identity} · {identity.uniqueness}”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/news"
              className="bg-brand group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-white shadow-xl shadow-saffron-500/30 transition hover:brightness-110"
            >
              ข่าวประชาสัมพันธ์ <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-azure-700 shadow-lg ring-1 ring-azure-100 transition hover:ring-azure-300"
            >
              <span className="grid size-6 place-items-center rounded-full bg-azure-500 text-white">
                <Play className="size-3 fill-current" />
              </span>
              ดูวิดีโอแนะนำ
            </Link>
          </motion.div>
        </div>

        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl shadow-azure-900/20"
          >
            <VideoPlayer video="intro" controls={false} autoPlay loop />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-8 -left-2 animate-float rounded-2xl bg-white p-4 shadow-xl sm:-left-8"
          >
            <div className="text-xs text-ink/60">นักเรียนปีการศึกษา 2569</div>
            <div className="font-display text-3xl font-bold text-saffron-500">
              <Counter to={1771} /> <span className="text-base text-ink">คน</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05 }}
            className="absolute -top-6 right-2 animate-float-slow rounded-2xl bg-azure-500 px-5 py-3 font-display text-white shadow-xl shadow-azure-500/30 sm:-right-6"
          >
            {identity.motto}
          </motion.div>
        </motion.div>
      </div>
      <Wave className="absolute inset-x-0 -bottom-px h-16 w-full text-white" />
    </section>
  )
}

function Ticker() {
  const items = news.slice(0, 8)
  return (
    <div className="bg-brand relative -mt-1 overflow-hidden py-3 text-white">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {[...items, ...items].map((n, i) => (
          <span key={i} className="flex items-center gap-3 font-display">
            <Megaphone className="size-4 shrink-0" /> {n.title}
          </span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="mx-auto -mt-2 max-w-7xl px-4 pt-16 sm:px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className={`relative overflow-hidden rounded-3xl p-6 text-center shadow-lg ${
              i % 2 ? 'bg-azure-50 ring-1 ring-azure-100' : 'bg-saffron-50 ring-1 ring-saffron-100'
            }`}
          >
            <div className={`font-display text-4xl font-bold md:text-5xl ${i % 2 ? 'text-azure-600' : 'text-saffron-500'}`}>
              <Counter to={s.value} />
            </div>
            <div className="mt-1 text-ink/70">
              {s.label} <span className="text-ink/40">({s.suffix})</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function Welcome() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <Reveal x={-40} y={0} className="relative">
        <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-saffron-400 to-azure-400" />
        <div className="grid grid-cols-[1fr_1.2fr] items-end gap-4 rounded-[2rem] bg-white p-4">
          <img src={director.photo} alt={director.name} className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div className="p-2">
            <Quote className="size-10 text-saffron-400" />
            <p className="mt-2 font-display text-xl leading-relaxed text-ink">
              การศึกษาให้คุณค่ากว่าสิ่งใด — เราพร้อมพัฒนาผู้เรียนให้เป็นคนดี มีปัญญา และก้าวทันโลก
            </p>
            <div className="mt-4 border-l-4 border-saffron-500 pl-3">
              <div className="font-display font-semibold text-ink">{director.name}</div>
              <div className="text-sm text-azure-700">{director.position}</div>
            </div>
          </div>
        </div>
      </Reveal>

      <div>
        <SectionHeading align="left" eyebrow="รู้จัก อ.ส.ช." title={<>โรงเรียนของชุมชน <span className="text-gradient">อ้อมน้อย</span></>} />
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-ink/70">
            ก่อตั้งเมื่อปี พ.ศ. 2525 โดยพระครูโสภณธรรมสาคร (หลวงพ่ออาบ) เจ้าอาวาสวัดอ้อมน้อย ร่วมกับกำนัน ผู้ใหญ่บ้าน และประชาชนชาวตำบลอ้อมน้อย
            เริ่มต้นจากนักเรียน 88 คน ครู 5 คน สู่โรงเรียนมัธยมศึกษาขนาดใหญ่ที่มีนักเรียนกว่า 1,700 คน
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { k: 'อัตลักษณ์', v: identity.identity },
            { k: 'เอกลักษณ์', v: identity.uniqueness },
            { k: 'คติพจน์', v: identity.motto },
            { k: 'ต้นไม้ประจำโรงเรียน', v: identity.tree },
          ].map((x, i) => (
            <div key={x.k} className={`rounded-2xl p-5 ${i % 2 ? 'bg-azure-50' : 'bg-saffron-50'}`}>
              <div className="text-sm text-ink/60">{x.k}</div>
              <div className={`font-display text-xl font-semibold ${i % 2 ? 'text-azure-700' : 'text-saffron-600'}`}>{x.v}</div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.3}>
          <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-display text-saffron-600">
            อ่านประวัติโรงเรียน <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function LatestNews() {
  const [active, setActive] = useState(null)
  const latest = news
    .filter((n) => n.image && (n.category === 'newsletter' || n.category === 'pr'))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
  return (
    <section className="bg-gradient-to-b from-white via-azure-50/60 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="อัปเดตล่าสุด" title="ข่าวและกิจกรรม" desc="ติดตามความเคลื่อนไหว กิจกรรม และประกาศสำคัญของโรงเรียน" />
          <Reveal className="mb-12">
            <Link to="/news" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-white transition hover:bg-saffron-500">
              ดูข่าวทั้งหมด <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {latest.map((n, i) => (
            <NewsCard key={n.id} item={n} featured={i === 0} onOpen={setActive} />
          ))}
        </motion.div>
      </div>
      <NewsModal item={active} onClose={() => setActive(null)} />
    </section>
  )
}

function VideoNews() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24">
      <div className="absolute -top-32 left-1/4 -z-10 size-[500px] rounded-full bg-saffron-500/25 blur-3xl" />
      <div className="absolute right-0 bottom-0 -z-10 size-[500px] rounded-full bg-azure-500/25 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading light eyebrow="Powered by Remotion" title="จดหมายข่าว อ.ส.ช. แบบวิดีโอ" desc="สรุปข่าวเด่นประจำเดือนในรูปแบบโมชันกราฟิก สร้างอัตโนมัติจากข้อมูลข่าวด้วย React + Remotion" />
        <Reveal className="overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <VideoPlayer video="newsReel" />
        </Reveal>
      </div>
    </section>
  )
}

function Programs() {
  const all = [
    ...programs.lower.plans.map((p) => ({ ...p, level: 'ม.ต้น' })),
    ...programs.upper.plans.map((p) => ({ ...p, level: 'ม.ปลาย' })),
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="หลักสูตรที่เปิดสอน" title="แผนการเรียนที่ใช่ สำหรับทุกความถนัด" desc="จัดการเรียนรู้ตามแนวพหุปัญญา เทียบเคียงมาตรฐานสากล" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {all.map((p, i) => (
          <motion.div
            key={p.level + p.name}
            variants={fadeUp}
            whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
            className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-lg ring-1 ring-azure-100"
          >
            <div className={`absolute -top-10 -right-10 size-32 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${i % 2 ? 'bg-azure-400' : 'bg-saffron-400'}`} />
            <div className={`grid size-14 place-items-center rounded-2xl text-white shadow-lg ${i % 2 ? 'bg-azure-500 shadow-azure-500/30' : 'bg-saffron-500 shadow-saffron-500/30'}`}>
              <Icon name={p.icon} className="size-7" />
            </div>
            <div className="mt-5 text-sm text-ink/50">{p.level}</div>
            <h3 className="font-display text-xl font-semibold text-ink">{p.name}</h3>
          </motion.div>
        ))}
      </motion.div>
      <Reveal className="mt-10 text-center">
        <Link to="/academics" className="group inline-flex items-center gap-2 font-display text-saffron-600">
          ดูข้อมูลวิชาการทั้งหมด <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

function QuickLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="bg-brand relative isolate overflow-hidden rounded-[2.5rem] p-8 text-white md:p-14">
        <div className="absolute -right-20 -bottom-20 -z-10 size-80 animate-spin-slow rounded-full border-[30px] border-dashed border-white/15" />
        <SectionHeading light align="left" eyebrow="บริการออนไลน์" title="ระบบสารสนเทศสำหรับนักเรียนและผู้ปกครอง" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map((q) => (
            <motion.a
              key={q.label}
              variants={fadeUp}
              href={q.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              className="group flex items-center gap-4 rounded-2xl bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur transition hover:bg-white hover:text-ink"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-saffron-500 transition group-hover:bg-saffron-500 group-hover:text-white">
                <Icon name={q.icon} className="size-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold">{q.label}</span>
                <span className="text-sm opacity-80">{q.desc}</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <SectionHeading eyebrow="บรรยากาศ" title="ภาพแห่งความภาคภูมิใจ" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={g.src} delay={i * 0.08} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
            <img src={g.src} alt={g.caption} loading="lazy" className="size-full min-h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 font-display text-white transition-transform duration-500 group-hover:translate-y-0">
              {g.caption}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Stats />
      <Welcome />
      <LatestNews />
      <VideoNews />
      <Programs />
      <QuickLinks />
      <Gallery />
    </>
  )
}
