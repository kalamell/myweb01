// แปลง path ของไฟล์ใน public/ ให้ถูกต้องเมื่อเว็บไม่ได้อยู่ที่ root ของโดเมน (เช่น GitHub Pages /myweb01/)
const base = import.meta.env?.BASE_URL ?? '/'

export const asset = (path) => `${base}${path.replace(/^\//, '')}`
