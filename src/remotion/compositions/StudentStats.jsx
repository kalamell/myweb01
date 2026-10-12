import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { font, palette } from '../theme'
import { Rays } from './Rays'

export const StudentStats = ({ grades = [], year = 2569, total = 0 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const max = Math.max(...grades.map((g) => g.male + g.female), 1)
  const title = spring({ frame, fps, config: { damping: 200 } })
  const totalP = spring({ frame: frame - 70, fps, config: { damping: 200 }, durationInFrames: 45 })
  const chartH = 560

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, #ffffff 0%, ${palette.azureSoft} 100%)`, fontFamily: font }}>
      <Rays origin="100% 0%" opacity={0.16} color={palette.saffronLight} />
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 80,
          opacity: title,
          transform: `translateY(${(1 - title) * -30}px)`,
        }}
      >
        <div style={{ fontSize: 34, color: palette.saffron, fontWeight: 600 }}>ข้อมูลนักเรียน ปีการศึกษา {year}</div>
        <div style={{ fontSize: 76, color: palette.ink, fontWeight: 800 }}>จำนวนนักเรียนแยกตามระดับชั้น</div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 80,
          textAlign: 'right',
          opacity: totalP,
          transform: `scale(${0.7 + totalP * 0.3})`,
          transformOrigin: 'right top',
        }}
      >
        <div style={{ fontSize: 130, fontWeight: 800, color: palette.saffron, lineHeight: 1 }}>
          {Math.round(total * totalP).toLocaleString('th-TH')}
        </div>
        <div style={{ fontSize: 36, color: palette.azureDeep }}>นักเรียนทั้งหมด (คน)</div>
      </div>

      <div style={{ position: 'absolute', left: 110, right: 110, bottom: 120, height: chartH, display: 'flex', alignItems: 'flex-end', gap: 50 }}>
        {grades.map((g, i) => {
          const p = spring({ frame: frame - 15 - i * 6, fps, config: { damping: 18 } })
          const maleH = (g.male / max) * chartH * 0.85 * p
          const femaleH = (g.female / max) * chartH * 0.85 * p
          const label = interpolate(p, [0.6, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          return (
            <div key={g.grade} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: palette.ink, opacity: label }}>{g.male + g.female}</div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(11,37,64,0.15)' }}>
                <div style={{ height: femaleH, background: `linear-gradient(180deg, ${palette.saffronLight}, ${palette.saffron})` }} />
                <div style={{ height: maleH, background: `linear-gradient(180deg, ${palette.azure}, ${palette.azureDeep})` }} />
              </div>
              <div style={{ fontSize: 44, fontWeight: 600, color: palette.azureDeep }}>{g.grade}</div>
            </div>
          )
        })}
      </div>

      <div style={{ position: 'absolute', left: 110, bottom: 50, display: 'flex', gap: 40, fontSize: 30, color: palette.ink }}>
        <span><span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 6, background: palette.azure, marginRight: 10 }} />ชาย</span>
        <span><span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 6, background: palette.saffron, marginRight: 10 }} />หญิง</span>
      </div>
    </AbsoluteFill>
  )
}
