import { loadFont } from '@remotion/google-fonts/Kanit'
import { getRemotionEnvironment, staticFile } from 'remotion'
import { asset } from '../lib/asset.js'

const { fontFamily } = loadFont('normal', {
  weights: ['400', '600', '800'],
  subsets: ['thai', 'latin'],
})

export const font = fontFamily

export const palette = {
  saffron: '#f26b1d',
  saffronLight: '#ff8a3d',
  saffronSoft: '#ffd1a8',
  azure: '#38b0f2',
  azureDeep: '#1a72ad',
  azureSoft: '#bfeafe',
  ink: '#0b2540',
  white: '#ffffff',
}

export const FPS = 30

// ใน Player บนเว็บใช้ base path ของ Vite ส่วนใน Remotion Studio / CLI ใช้ staticFile()
export const media = (path) =>
  getRemotionEnvironment().isPlayer ? asset(path) : staticFile(path.replace(/^\//, ''))
