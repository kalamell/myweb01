import { Composition } from 'remotion'
import { news, students } from '../data/school'
import { NewsReel, newsReelDuration } from './compositions/NewsReel'
import { SchoolIntro } from './compositions/SchoolIntro'
import { StudentStats } from './compositions/StudentStats'
import { FPS } from './theme'

export const videos = {
  intro: { component: SchoolIntro, durationInFrames: 390, fps: FPS, width: 1920, height: 1080 },
  newsReel: {
    component: NewsReel,
    durationInFrames: newsReelDuration(5),
    fps: FPS,
    width: 1920,
    height: 1080,
    defaultProps: { items: news.filter((n) => n.category === 'newsletter'), label: 'จดหมายข่าว อ.ส.ช.' },
  },
  stats: {
    component: StudentStats,
    durationInFrames: 180,
    fps: FPS,
    width: 1920,
    height: 1080,
    defaultProps: { grades: students.grades, year: students.year, total: students.total },
  },
}

// ใช้กับ Remotion Studio / Remotion CLI สำหรับเรนเดอร์เป็นไฟล์ MP4
export const RemotionRoot = () => (
  <>
    <Composition id="SchoolIntro" {...videos.intro} />
    <Composition id="NewsReel" {...videos.newsReel} />
    <Composition id="StudentStats" {...videos.stats} />
  </>
)
