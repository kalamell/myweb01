import { motion } from 'framer-motion'
import { Eye, Music, Target, Trees } from 'lucide-react'
import { asset } from '../lib/asset'
import { PageHero, Reveal, SectionHeading, fadeUp, stagger } from '../components/ui'
import { colors, emblem, identity, missions, nameMeaning, objectives, school, song, timeline } from '../data/school'

function Emblem() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Reveal className="relative mx-auto grid aspect-square w-full max-w-md place-items-center">
        <div
          className="absolute inset-0 animate-spin-slow rounded-full opacity-40"
          style={{ background: 'repeating-conic-gradient(var(--color-saffron-400) 0deg 7deg, transparent 7deg 15deg)' }}
        />
        <div className="absolute inset-10 rounded-full bg-white shadow-2xl shadow-saffron-500/20" />
        <motion.img
          src={asset(school.logo)}
          alt="ตราสัญลักษณ์โรงเรียน"
          className="relative h-3/5 w-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Reveal>
      <div>
        <SectionHeading align="left" eyebrow="สัญลักษณ์โรงเรียน" title="ฉัตร 5 ชั้น รัศมี และเลข ๙" desc="ตราสัญลักษณ์ประจำโรงเรียนประกอบด้วย 3 ส่วนสำคัญ" />
        <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          {emblem.map((e, i) => (
            <motion.li key={e.title} variants={fadeUp} className="flex gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-azure-100">
              <span className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-lg font-bold text-white ${['bg-saffron-500', 'bg-azure-500', 'bg-ink'][i]}`}>
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="text-ink/70">{e.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {colors.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md ring-1 ring-azure-100">
              <span className={`size-14 shrink-0 rounded-2xl ${c.className} shadow-lg`} />
              <div>
                <div className="font-display text-lg font-semibold">{c.name}</div>
                <div className="text-sm text-ink/60">{c.meaning}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function NameMeaning() {
  return (
    <section className="bg-saffron-50/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="ความเป็นมาของชื่อ" title={<>อ้อมน้อย + โสภณ + ชน + อุปถัมภ์</>} />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 md:grid-cols-4">
          {nameMeaning.map((n, i) => (
            <motion.div key={n.word} variants={fadeUp} whileHover={{ y: -6 }} className="relative rounded-3xl bg-white p-6 shadow-lg">
              <div className={`font-display text-3xl font-bold ${i % 2 ? 'text-azure-600' : 'text-saffron-500'}`}>{n.word}</div>
              <p className="mt-2 text-ink/70">{n.meaning}</p>
              {i < nameMeaning.length - 1 && (
                <span className="absolute top-1/2 -right-4 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-ink font-bold text-white md:grid">+</span>
              )}
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="mx-auto mt-10 max-w-3xl text-center text-lg text-ink/75">
          “อ้อมน้อยโสภณชนูปถัมภ์” จึงหมายถึง โรงเรียนประจำตำบลอ้อมน้อย ที่ได้รับการอุปถัมภ์จากพระครูโสภณธรรมสาคร และประชาชน รวมถึงพ่อแม่ผู้ปกครองของนักเรียน
        </Reveal>
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="ประวัติโรงเรียน" title="เส้นทางกว่า 4 ทศวรรษ" />
      <div className="relative">
        <motion.div
          className="absolute top-0 left-5 h-full w-1 origin-top rounded-full bg-gradient-to-b from-saffron-500 to-azure-500 md:left-1/2 md:-ml-0.5"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        <div className="space-y-12">
          {timeline.map((t, i) => {
            const left = i % 2 === 0
            return (
              <div key={t.year} className={`relative flex md:items-center ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <span className="absolute left-5 z-10 size-5 -translate-x-1/2 rounded-full border-4 border-white bg-saffron-500 shadow-lg ring-4 ring-saffron-200 md:left-1/2" />
                <Reveal x={left ? -40 : 40} y={0} className={`ml-12 md:ml-0 md:w-1/2 ${left ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                  <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-azure-100">
                    <span className={`inline-block rounded-full px-3 py-1 font-display text-sm text-white ${i % 2 ? 'bg-azure-500' : 'bg-saffron-500'}`}>{t.year}</span>
                    <h3 className="mt-3 font-display text-xl font-semibold">{t.title}</h3>
                    <p className="mt-2 text-ink/70">{t.text}</p>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <Reveal className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <img src={asset('images/hist2.webp')} alt="พระครูโสภณธรรมสาคร (หลวงพ่ออาบ)" className="aspect-[5/4] w-full object-cover object-top" loading="lazy" />
          <div className="p-5 font-display">พระครูโสภณธรรมสาคร (หลวงพ่ออาบ) ผู้ก่อตั้งโรงเรียน</div>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <img src={asset('images/hist1.webp')} alt="หลวงพ่อเพ็ง" className="aspect-[5/4] w-full object-cover" loading="lazy" />
          <div className="p-5 font-display">หลวงพ่อเพ็ง พระประธานในอุโบสถวัดอ้อมน้อย พระพุทธรูปประจำสถานศึกษา</div>
        </Reveal>
      </div>
    </section>
  )
}

function VisionMission() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white">
      <div className="absolute -top-40 -left-20 -z-10 size-[480px] rounded-full bg-saffron-500/30 blur-3xl" />
      <div className="absolute -right-20 -bottom-40 -z-10 size-[480px] rounded-full bg-azure-500/30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 font-display text-sm">
            <Eye className="size-4" /> วิสัยทัศน์
          </span>
          <p className="mt-6 font-display text-2xl leading-relaxed md:text-3xl">{identity.vision}</p>
        </Reveal>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-2xl font-semibold">
              <Target className="size-7 text-saffron-400" /> พันธกิจ
            </h3>
            <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
              {missions.map((m, i) => (
                <motion.li key={i} variants={fadeUp} className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10">
                  <span className="font-display text-2xl font-bold text-saffron-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/85">{m}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-2xl font-semibold">
              <Target className="size-7 text-azure-400" /> เป้าประสงค์
            </h3>
            <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
              {objectives.map((m, i) => (
                <motion.li key={i} variants={fadeUp} className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10">
                  <span className="font-display text-2xl font-bold text-azure-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-white/85">{m}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Song() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <div>
        <SectionHeading align="left" eyebrow="เพลงโรงเรียน" title={song.title} desc={`ประพันธ์โดย ${song.author}`} />
        <div className="space-y-6">
          {song.verses.map((v, i) => (
            <Reveal key={i} delay={i * 0.1} className={`rounded-3xl border-l-4 p-6 ${i % 2 ? 'border-azure-500 bg-azure-50' : 'border-saffron-500 bg-saffron-50'}`}>
              <Music className={`mb-2 size-5 ${i % 2 ? 'text-azure-500' : 'text-saffron-500'}`} />
              {v.map((line) => (
                <p key={line} className="font-display text-lg leading-relaxed">{line}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Reveal className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <img src={asset('images/tree.webp')} alt="ต้นนนทรี" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          <div className="flex items-center gap-3 p-6">
            <Trees className="size-8 text-saffron-500" />
            <div>
              <div className="text-sm text-ink/60">ต้นไม้ประจำโรงเรียน</div>
              <div className="font-display text-2xl font-semibold">{identity.tree}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="bg-brand rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm opacity-80">ปรัชญาของโรงเรียน</div>
          <div className="mt-2 font-display text-3xl font-bold">{identity.philosophyPali}</div>
          <div className="mt-1 text-lg">{identity.philosophy}</div>
          <div className="mt-6 text-sm opacity-80">คติพจน์</div>
          <div className="font-display text-2xl font-semibold">{identity.motto}</div>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero eyebrow="เกี่ยวกับโรงเรียน" title={school.name} desc={`โรงเรียนสหศึกษา ก่อตั้งเมื่อ พ.ศ. ${school.founded} บนที่ธรณีสงฆ์ของวัดอ้อมน้อย ด้วยแรงศรัทธาของชุมชน`} />
      <Timeline />
      <NameMeaning />
      <Emblem />
      <VisionMission />
      <Song />
    </>
  )
}
