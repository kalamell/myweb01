import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { palette } from '../theme'

// รัศมีสีแสดแผ่กระจาย — อ้างอิงสัญลักษณ์ของโรงเรียน
export const Rays = ({ count = 24, color = palette.saffronLight, opacity = 0.18, speed = 0.15, origin = '50% 50%' }) => {
  const frame = useCurrentFrame()
  const step = 360 / count
  const stops = []
  for (let i = 0; i < count; i++) {
    const a = i * step
    stops.push(`${color} ${a}deg ${a + step / 2}deg`, `transparent ${a + step / 2}deg ${a + step}deg`)
  }
  return (
    <AbsoluteFill
      style={{
        background: `conic-gradient(from ${frame * speed}deg at ${origin}, ${stops.join(',')})`,
        opacity,
        maskImage: `radial-gradient(circle at ${origin}, black 0%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle at ${origin}, black 0%, transparent 70%)`,
      }}
    />
  )
}

export const Bubbles = ({ seed = 1 }) => {
  const frame = useCurrentFrame()
  const items = Array.from({ length: 14 }, (_, i) => {
    const r = Math.sin(i * 91.7 + seed) * 0.5 + 0.5
    const r2 = Math.cos(i * 37.3 + seed) * 0.5 + 0.5
    return {
      left: `${r * 100}%`,
      size: 20 + r2 * 90,
      top: `${(((r2 * 120 - frame * (0.15 + r * 0.35)) % 130) + 130) % 130 - 15}%`,
      color: i % 2 ? palette.azure : palette.saffronLight,
    }
  })
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {items.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            border: `3px solid ${b.color}`,
            opacity: 0.35,
          }}
        />
      ))}
    </AbsoluteFill>
  )
}
