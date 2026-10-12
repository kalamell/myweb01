import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'
import { wipe } from '@remotion/transitions/wipe'
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { font, media, palette } from '../theme'
import { Rays } from './Rays'

export const SLIDE_FRAMES = 120
export const TRANSITION_FRAMES = 20


const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })

const NewsSlide = ({ item, index, total, label }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const zoom = interpolate(frame, [0, SLIDE_FRAMES + TRANSITION_FRAMES], [1.05, 1.18])
  const card = spring({ frame: frame - 6, fps, config: { damping: 15 } })
  const text = spring({ frame: frame - 14, fps, config: { damping: 200 } })
  const chip = spring({ frame: frame - 4, fps, config: { damping: 200 } })
  const progress = interpolate(frame, [0, SLIDE_FRAMES], [0, 1], { extrapolateRight: 'clamp' })
  const accent = index % 2 ? palette.azure : palette.saffron

  return (
    <AbsoluteFill style={{ background: palette.ink, overflow: 'hidden' }}>
      {item.image ? (
        <Img
          src={media(item.image)}
          style={{
            position: 'absolute',
            inset: -40,
            width: 'calc(100% + 80px)',
            height: 'calc(100% + 80px)',
            objectFit: 'cover',
            filter: 'blur(28px) saturate(1.3) brightness(0.55)',
            transform: `scale(${zoom})`,
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{ background: `linear-gradient(100deg, ${palette.ink}ee 0%, ${palette.ink}aa 45%, transparent 80%)` }}
      />
      <Rays origin="85% 50%" opacity={0.12} color={accent} />

      <div style={{ position: 'absolute', left: 110, top: 0, bottom: 0, width: 980, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36 }}>
        <div
          style={{
            alignSelf: 'flex-start',
            fontFamily: font,
            fontWeight: 600,
            fontSize: 34,
            color: palette.white,
            background: accent,
            padding: '10px 30px',
            borderRadius: 999,
            transform: `translateX(${(1 - chip) * -200}px)`,
            opacity: chip,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: font,
            fontWeight: 800,
            fontSize: item.title.length > 90 ? 52 : 64,
            lineHeight: 1.3,
            color: palette.white,
            opacity: text,
            transform: `translateY(${(1 - text) * 50}px)`,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </div>
        <div style={{ fontFamily: font, fontSize: 34, color: palette.azureSoft, opacity: text }}>
          {formatDate(item.date)} · โรงเรียนอ้อมน้อยโสภณชนูปถัมภ์
        </div>
      </div>

      {item.image ? (
        <div
          style={{
            position: 'absolute',
            right: 120,
            top: '50%',
            width: 560,
            height: 760,
            marginTop: -380,
            borderRadius: 36,
            overflow: 'hidden',
            background: palette.white,
            boxShadow: '0 40px 90px rgba(0,0,0,0.45)',
            border: `10px solid ${palette.white}`,
            transform: `translateX(${(1 - card) * 400}px) rotate(${(1 - card) * 12 + 2}deg)`,
          }}
        >
          <Img src={media(item.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        </div>
      ) : null}

      <div style={{ position: 'absolute', left: 110, right: 110, bottom: 60, display: 'flex', gap: 12 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${i < index ? 100 : i === index ? progress * 100 : 0}%`,
                background: `linear-gradient(90deg, ${palette.saffron}, ${palette.azure})`,
              }}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}

// แต่ละ Sequence ยาว SLIDE + TRANSITION และทรานซิชันซ้อนทับกัน TRANSITION เฟรม
export const newsReelDuration = (count) => Math.max(count, 1) * SLIDE_FRAMES + TRANSITION_FRAMES

export const NewsReel = ({ items = [], label = 'ข่าวประชาสัมพันธ์' }) => {
  if (items.length === 0) return <AbsoluteFill style={{ background: palette.ink }} />
  return (
    <TransitionSeries>
      {items.map((item, i) => [
        <TransitionSeries.Sequence key={`s${item.id}`} durationInFrames={SLIDE_FRAMES + TRANSITION_FRAMES}>
          <NewsSlide item={item} index={i} total={items.length} label={label} />
        </TransitionSeries.Sequence>,
        i < items.length - 1 ? (
          <TransitionSeries.Transition
            key={`t${item.id}`}
            presentation={i % 2 ? wipe({ direction: 'from-left' }) : slide({ direction: 'from-right' })}
            timing={i % 2 ? linearTiming({ durationInFrames: TRANSITION_FRAMES }) : springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
          />
        ) : null,
      ])}
    </TransitionSeries>
  )
}
