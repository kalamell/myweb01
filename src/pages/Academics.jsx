import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Users } from 'lucide-react'
import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { Counter, Icon, PageHero, Reveal, SectionHeading, fadeUp, stagger } from '../components/ui'
import { departments, programs, students } from '../data/school'

function Plans() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="โครงสร้างแผนการเรียน" title="หลักสูตรที่เปิดสอน" />
      <div className="grid gap-8 lg:grid-cols-2">
        {[programs.lower, programs.upper].map((lvl, li) => (
          <Reveal key={lvl.level} delay={li * 0.1} className={`rounded-[2rem] p-8 ${li ? 'bg-azure-50 ring-1 ring-azure-100' : 'bg-saffron-50 ring-1 ring-saffron-100'}`}>
            <div className="flex items-center gap-3">
              <GraduationCap className={`size-8 ${li ? 'text-azure-600' : 'text-saffron-500'}`} />
              <h3 className="text-2xl font-semibold">{lvl.level}</h3>
            </div>
            <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 space-y-3">
              {lvl.plans.map((p) => (
                <motion.li key={p.name} variants={fadeUp} whileHover={{ x: 6 }} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <span className={`grid size-12 place-items-center rounded-xl text-white ${li ? 'bg-azure-500' : 'bg-saffron-500'}`}>
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <span className="font-display text-lg">แผนการเรียน {p.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Departments() {
  return (
    <section className="bg-gradient-to-b from-white to-azure-50/70 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="ฝ่ายบริหารและบุคลากร" title="กลุ่มสาระการเรียนรู้และงานสนับสนุน" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
          {departments.map((d, i) => (
            <motion.span
              key={d}
              variants={fadeUp}
              whileHover={{ scale: 1.08, rotate: i % 2 ? 2 : -2 }}
              className={`flex items-center gap-2 rounded-full px-5 py-3 font-display shadow-md ${
                i % 2 ? 'bg-white text-azure-700 ring-1 ring-azure-200' : 'bg-white text-saffron-600 ring-1 ring-saffron-200'
              }`}
            >
              <BookOpen className="size-4" /> {d}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StudentData() {
  const [view, setView] = useState('chart')
  const max = Math.max(...students.grades.map((g) => g.male + g.female))
  const male = students.grades.reduce((s, g) => s + g.male, 0)
  const female = students.grades.reduce((s, g) => s + g.female, 0)

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow={`ข้อมูล ณ วันที่ ${students.asOf}`} title={`ข้อมูลนักเรียน ปีการศึกษา ${students.year}`} />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'นักเรียนทั้งหมด', value: students.total, cls: 'bg-brand text-white' },
          { label: 'นักเรียนชาย', value: male, cls: 'bg-azure-50 text-azure-700' },
          { label: 'นักเรียนหญิง', value: female, cls: 'bg-saffron-50 text-saffron-600' },
        ].map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08} className={`rounded-3xl p-6 shadow-lg ${c.cls}`}>
            <Users className="size-6 opacity-80" />
            <div className="mt-2 font-display text-4xl font-bold"><Counter to={c.value} /></div>
            <div className="opacity-80">{c.label} (คน)</div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-full bg-azure-50 p-1 ring-1 ring-azure-100">
          {[
            { id: 'chart', label: 'กราฟ' },
            { id: 'video', label: 'วิดีโอ Remotion' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setView(t.id)}
              className={`relative rounded-full px-6 py-2 font-display transition ${view === t.id ? 'text-white' : 'text-azure-700'}`}
            >
              {view === t.id && <motion.span layoutId="stat-tab" className="bg-brand absolute inset-0 -z-0 rounded-full" />}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {view === 'chart' ? (
          <Reveal className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-azure-100 md:p-10">
            <div className="flex h-80 items-end gap-3 md:gap-8">
              {students.grades.map((g, i) => {
                const total = g.male + g.female
                return (
                  <div key={g.grade} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className="font-display text-lg font-bold text-ink">{total}</span>
                    <motion.div
                      className="flex w-full flex-col overflow-hidden rounded-t-2xl"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(total / max) * 85}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="bg-gradient-to-b from-saffron-400 to-saffron-500 transition group-hover:brightness-110" style={{ flex: g.female }} title={`หญิง ${g.female}`} />
                      <div className="bg-gradient-to-b from-azure-400 to-azure-600 transition group-hover:brightness-110" style={{ flex: g.male }} title={`ชาย ${g.male}`} />
                    </motion.div>
                    <span className="font-display text-azure-700">{g.grade}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-2"><span className="size-3 rounded bg-azure-500" /> ชาย</span>
              <span className="flex items-center gap-2"><span className="size-3 rounded bg-saffron-500" /> หญิง</span>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[480px] text-center">
                <thead>
                  <tr className="bg-ink text-white">
                    {['ชั้น', 'ชาย', 'หญิง', 'รวม', 'ห้องเรียน'].map((h, i) => (
                      <th key={h} className={`px-4 py-3 font-display font-medium ${i === 0 ? 'rounded-l-xl' : ''} ${i === 4 ? 'rounded-r-xl' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.grades.map((g) => (
                    <tr key={g.grade} className="border-b border-azure-100 transition hover:bg-saffron-50">
                      <td className="px-4 py-3 font-display font-semibold">{g.grade}</td>
                      <td className="px-4 py-3">{g.male}</td>
                      <td className="px-4 py-3">{g.female}</td>
                      <td className="px-4 py-3 font-semibold">{g.male + g.female}</td>
                      <td className="px-4 py-3">{g.rooms}</td>
                    </tr>
                  ))}
                  <tr className="font-display font-bold text-saffron-600">
                    <td className="px-4 py-3">รวม</td>
                    <td className="px-4 py-3">{male}</td>
                    <td className="px-4 py-3">{female}</td>
                    <td className="px-4 py-3">{students.total.toLocaleString('th-TH')}</td>
                    <td className="px-4 py-3">{students.rooms}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-azure-100">
            <VideoPlayer video="stats" autoPlay />
          </motion.div>
        )}
      </div>

      <Reveal className="mt-14">
        <h3 className="mb-4 text-center text-xl font-semibold">จำนวนนักเรียนย้อนหลัง</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {students.history.map((h, i) => (
            <div key={h.year} className={`rounded-2xl p-5 text-center ${i === students.history.length - 1 ? 'bg-brand text-white' : 'bg-white ring-1 ring-azure-100'}`}>
              <div className="text-sm opacity-70">ปีการศึกษา {h.year}</div>
              <div className="font-display text-3xl font-bold">{h.total.toLocaleString('th-TH')}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default function Academics() {
  return (
    <>
      <PageHero eyebrow="วิชาการ" title="เรียนรู้ตามแนวพหุปัญญา สู่ความเป็นเลิศรอบด้าน" desc="หลักสูตรเทียบเคียงมาตรฐานสากล มุ่งเน้น “1 Student 1 Innovation” ให้ผู้เรียนสร้างนวัตกรรมได้ด้วยตนเอง" />
      <Plans />
      <Departments />
      <StudentData />
    </>
  )
}
