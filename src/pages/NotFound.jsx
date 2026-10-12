import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { school } from '../data/school'
import { asset } from '../lib/asset'

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-32 text-center">
      <div>
        <motion.img
          src={asset(school.logo)}
          alt=""
          className="mx-auto h-32"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h1 className="text-gradient mt-6 text-7xl font-extrabold">404</h1>
        <p className="mt-2 text-lg text-ink/70">ไม่พบหน้าที่คุณต้องการ</p>
        <Link to="/" className="bg-brand mt-8 inline-block rounded-full px-8 py-3 font-display text-white">
          กลับหน้าแรก
        </Link>
      </div>
    </section>
  )
}
