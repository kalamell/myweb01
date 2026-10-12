import { Player } from '@remotion/player'
import { videos } from '../remotion/Root'

// เมื่อไม่เล่นอัตโนมัติ ให้เริ่มที่เฟรมที่มีเนื้อหาแล้ว เพื่อใช้เป็นภาพตัวอย่าง
const POSTER_FRAME = 45

// แสดงคอมโพสิชันของ Remotion บนหน้าเว็บผ่าน @remotion/player
export default function VideoPlayer({ video = 'intro', inputProps, durationInFrames, controls = true, autoPlay = false, loop = true, initialFrame, className = '' }) {
  const v = videos[video]
  return (
    <Player
      component={v.component}
      durationInFrames={durationInFrames ?? v.durationInFrames}
      fps={v.fps}
      compositionWidth={v.width}
      compositionHeight={v.height}
      inputProps={inputProps ?? v.defaultProps ?? {}}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      initialFrame={initialFrame ?? (autoPlay ? 0 : POSTER_FRAME)}
      clickToPlay={controls}
      showVolumeControls={false}
      initiallyMuted
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
      className={className}
      style={{ width: '100%', aspectRatio: `${v.width} / ${v.height}` }}
    />
  )
}
