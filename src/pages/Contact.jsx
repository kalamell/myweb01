import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { FacebookIcon, PageHero, Reveal, fadeUp, stagger } from '../components/ui'
import { school } from '../data/school'

const channels = [
  { icon: MapPin, label: 'ที่อยู่', value: school.address },
  { icon: Phone, label: 'โทรศัพท์', value: school.phone, href: `tel:${school.phoneRaw}` },
  { icon: Mail, label: 'อีเมล', value: school.email, href: `mailto:${school.email}` },
  { icon: FacebookIcon, label: 'Facebook', value: 'เพจโรงเรียนอ้อมน้อยโสภณชนูปถัมภ์', href: school.facebook },
  { icon: Clock, label: 'เวลาทำการ', value: 'จันทร์ - ศุกร์ 08:00 - 16:30 น.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' })
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // เปิดโปรแกรมอีเมลของผู้ใช้พร้อมข้อความที่กรอกไว้
  const submit = (e) => {
    e.preventDefault()
    const body = `${form.message}\n\nจาก: ${form.name}`
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero eyebrow="ติดต่อเรา" title="ยินดีให้บริการและตอบทุกคำถาม" desc={school.office} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          {channels.map((c, i) => {
            const Ico = c.icon
            const inner = (
              <>
                <span className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg ${i % 2 ? 'bg-azure-500 shadow-azure-500/30' : 'bg-saffron-500 shadow-saffron-500/30'}`}>
                  <Ico className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink/55">{c.label}</span>
                  <span className="font-display text-lg text-ink">{c.value}</span>
                </span>
              </>
            )
            return (
              <motion.li key={c.label} variants={fadeUp}>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-md ring-1 ring-azure-100 transition hover:-translate-y-1 hover:ring-saffron-300">
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-md ring-1 ring-azure-100">{inner}</div>
                )}
              </motion.li>
            )
          })}
        </motion.ul>

        <Reveal className="rounded-[2rem] bg-gradient-to-br from-saffron-50 to-azure-50 p-8 shadow-xl ring-1 ring-azure-100">
          <h2 className="text-2xl font-bold">ส่งข้อความถึงโรงเรียน</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {[
              { k: 'name', label: 'ชื่อ - นามสกุล' },
              { k: 'subject', label: 'เรื่อง' },
            ].map((f) => (
              <label key={f.k} className="block">
                <span className="text-sm text-ink/70">{f.label}</span>
                <input
                  required
                  value={form[f.k]}
                  onChange={update(f.k)}
                  className="mt-1 w-full rounded-2xl border-0 bg-white px-4 py-3 shadow-sm ring-1 ring-azure-100 outline-none focus:ring-2 focus:ring-saffron-400"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-sm text-ink/70">ข้อความ</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                className="mt-1 w-full rounded-2xl border-0 bg-white px-4 py-3 shadow-sm ring-1 ring-azure-100 outline-none focus:ring-2 focus:ring-saffron-400"
              />
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-brand inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-white shadow-lg shadow-saffron-500/30"
            >
              <Send className="size-4" /> ส่งข้อความผ่านอีเมล
            </motion.button>
          </form>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-azure-100">
          <iframe
            title="แผนที่โรงเรียนอ้อมน้อยโสภณชนูปถัมภ์"
            src="https://www.google.com/maps?q=%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B9%82%E0%B8%AA%E0%B8%A0%E0%B8%93%E0%B8%8A%E0%B8%99%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B8%B1%E0%B8%A1%E0%B8%A0%E0%B9%8C&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>
    </>
  )
}
