import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { font, media, palette } from '../theme'
import { Bubbles, Rays } from './Rays'

const LogoReveal = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame, fps, config: { damping: 12, mass: 0.8 } })
  const ring = spring({ frame: frame - 6, fps, config: { damping: 200 } })
  const titleIn = spring({ frame: frame - 18, fps, config: { damping: 200 } })
  const subIn = spring({ frame: frame - 30, fps, config: { damping: 200 } })

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 36 }}>
      <div style={{ position: 'relative', width: 340, height: 340, display: 'grid', placeItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            transform: `scale(${ring})`,
            boxShadow: `0 0 0 ${14 * ring}px rgba(255,255,255,0.25), 0 30px 80px rgba(11,37,64,0.35)`,
          }}
        />
        <Img
          src={media('images/logo.png')}
          style={{ position: 'relative', height: 260, transform: `scale(${s}) rotate(${(1 - s) * -25}deg)` }}
        />
      </div>
      <div
        style={{
          fontFamily: font,
          fontWeight: 800,
          fontSize: 92,
          color: palette.white,
          textShadow: '0 6px 24px rgba(11,37,64,0.35)',
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 40}px)`,
          textAlign: 'center',
          lineHeight: 1.15,
        }}
      >
        โรงเรียนอ้อมน้อยโสภณชนูปถัมภ์
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: 38,
          color: palette.white,
          opacity: subIn * 0.95,
          transform: `translateY(${(1 - subIn) * 30}px)`,
          background: 'rgba(11,37,64,0.25)',
          padding: '10px 32px',
          borderRadius: 999,
        }}
      >
        สพม.สมุทรสาคร สมุทรสงคราม
      </div>
    </AbsoluteFill>
  )
}

const Philosophy = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const words = ['ปญฺญา', 'โลกสฺมิ', 'ปชฺโชโต']
  const meaning = spring({ frame: frame - 30, fps, config: { damping: 200 } })
  const bar = interpolate(frame, [10, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      <div style={{ fontFamily: font, fontSize: 34, color: palette.azureSoft, letterSpacing: 6 }}>ปรัชญาของโรงเรียน</div>
      <div style={{ display: 'flex', gap: 36 }}>
        {words.map((w, i) => {
          const p = spring({ frame: frame - i * 8, fps, config: { damping: 14 } })
          return (
            <span
              key={w}
              style={{
                fontFamily: font,
                fontWeight: 800,
                fontSize: 130,
                color: i === 1 ? palette.saffronLight : palette.white,
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 120}px) scale(${0.6 + p * 0.4})`,
                opacity: p,
              }}
            >
              {w}
            </span>
          )
        })}
      </div>
      <div style={{ height: 8, width: 700 * bar, borderRadius: 8, background: `linear-gradient(90deg, ${palette.saffron}, ${palette.azure})` }} />
      <div
        style={{
          fontFamily: font,
          fontWeight: 600,
          fontSize: 60,
          color: palette.white,
          opacity: meaning,
          transform: `translateY(${(1 - meaning) * 30}px)`,
        }}
      >
        “ปัญญาเป็นแสงสว่างในโลก”
      </div>
    </AbsoluteFill>
  )
}

const Counter = ({ value, label, delay }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 40 })
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 36,
        padding: '40px 30px',
        width: 340,
        textAlign: 'center',
        transform: `translateY(${(1 - p) * 80}px)`,
        opacity: p,
        boxShadow: '0 30px 60px rgba(11,37,64,0.25)',
      }}
    >
      <div style={{ fontFamily: font, fontWeight: 800, fontSize: 110, color: palette.saffron, lineHeight: 1 }}>
        {Math.round(value * p).toLocaleString('th-TH')}
      </div>
      <div style={{ fontFamily: font, fontSize: 40, color: palette.azureDeep, marginTop: 12 }}>{label}</div>
    </div>
  )
}

const Stats = () => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 60 }}>
    <div style={{ fontFamily: font, fontWeight: 600, fontSize: 64, color: palette.white }}>อ.ส.ช. ในตัวเลข</div>
    <div style={{ display: 'flex', gap: 44 }}>
      <Counter value={1771} label="นักเรียน" delay={6} />
      <Counter value={48} label="ห้องเรียน" delay={14} />
      <Counter value={2525} label="ปีที่ก่อตั้ง (พ.ศ.)" delay={22} />
    </div>
  </AbsoluteFill>
)

const Outro = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const p = spring({ frame, fps, config: { damping: 12 } })
  const motto = spring({ frame: frame - 15, fps, config: { damping: 200 } })
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 34 }}>
      <div
        style={{
          fontFamily: font,
          fontWeight: 800,
          fontSize: 150,
          color: palette.white,
          transform: `scale(${p})`,
          textShadow: '0 10px 40px rgba(11,37,64,0.35)',
        }}
      >
        แจ่มใส ไหว้งาม
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: 54,
          color: palette.ink,
          background: palette.white,
          padding: '14px 48px',
          borderRadius: 999,
          opacity: motto,
          transform: `translateY(${(1 - motto) * 40}px)`,
        }}
      >
        รู้สิทธิ์ · รู้หน้าที่ · มีวินัย
      </div>
    </AbsoluteFill>
  )
}

export const SchoolIntro = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const hue = interpolate(frame, [0, durationInFrames], [0, 1])
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${120 + hue * 60}deg, ${palette.saffron} 0%, ${palette.saffronLight} ${30 + hue * 10}%, ${palette.azure} ${75 - hue * 10}%, ${palette.azureDeep} 100%)`,
        overflow: 'hidden',
      }}
    >
      <Rays origin="50% 35%" opacity={0.22} />
      <Bubbles />
      <Sequence durationInFrames={95} premountFor={15}>
        <FadeOut duration={95}>
          <LogoReveal />
        </FadeOut>
      </Sequence>
      <Sequence from={95} durationInFrames={90} premountFor={15}>
        <FadeOut duration={90}>
          <Philosophy />
        </FadeOut>
      </Sequence>
      <Sequence from={185} durationInFrames={95} premountFor={15}>
        <FadeOut duration={95}>
          <Stats />
        </FadeOut>
      </Sequence>
      <Sequence from={280} premountFor={15}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  )
}

const FadeOut = ({ children, duration }) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 8, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
}
