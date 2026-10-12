import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Academics = lazy(() => import('./pages/Academics'))
const Contact = lazy(() => import('./pages/Contact'))
const Media = lazy(() => import('./pages/Media'))
const News = lazy(() => import('./pages/News'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Loading = () => (
  <div className="grid min-h-screen place-items-center">
    <span className="size-12 animate-spin rounded-full border-4 border-saffron-200 border-t-saffron-500" />
  </div>
)

const Page = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    <Suspense fallback={<Loading />}>{children}</Suspense>
  </motion.main>
)

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <ScrollProgress />
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/academics" element={<Page><Academics /></Page>} />
            <Route path="/news" element={<Page><News /></Page>} />
            <Route path="/media" element={<Page><Media /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}
