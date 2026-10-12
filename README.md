# เว็บไซต์ประชาสัมพันธ์ โรงเรียนอ้อมน้อยโสภณชนูปถัมภ์ (อ.ส.ช.)

เว็บไซต์ฉบับรีดีไซน์ ใช้ข้อมูลจากเว็บเดิม [osc.ac.th/mainpage](http://osc.ac.th/mainpage)
ใช้โทนสี **แสด** (แสงสว่างแห่งปัญญา) และ **ฟ้า** (ความกว้างไกลของการศึกษา) ซึ่งเป็นสีประจำโรงเรียน

## เทคโนโลยี

- **React 19 + Vite** — SPA พร้อม `react-router-dom`
- **Tailwind CSS v4** — กำหนดสี `saffron-*` (แสด) และ `azure-*` (ฟ้า) ใน `src/index.css`
- **Remotion** — วิดีโอโมชันกราฟิกที่เขียนด้วย React แสดงบนเว็บผ่าน `@remotion/player` และเรนเดอร์เป็น MP4 ได้
- **Framer Motion** — แอนิเมชันเปลี่ยนหน้า, scroll reveal, ตัวเลขนับขึ้น, เมนูแบบ pill, modal
- **lucide-react** — ไอคอน

## หน้าเว็บ

| เส้นทาง | เนื้อหา |
| --- | --- |
| `/` | Hero + วิดีโอแนะนำ (Remotion), ข่าววิ่ง, สถิติ, สารจากผู้อำนวยการ, ข่าวล่าสุด, จดหมายข่าวแบบวิดีโอ, แผนการเรียน, บริการออนไลน์, แกลเลอรี |
| `/about` | ประวัติแบบไทม์ไลน์, ความหมายชื่อโรงเรียน, ตราสัญลักษณ์และสีประจำโรงเรียน, วิสัยทัศน์ พันธกิจ เป้าประสงค์, เพลงมาร์ช อ.ส.ช. |
| `/academics` | แผนการเรียน ม.ต้น/ม.ปลาย, กลุ่มสาระฯ, ข้อมูลนักเรียน 2569 (กราฟ / ตาราง / วิดีโอ Remotion) |
| `/news` | ข่าวแยกหมวดพร้อมค้นหา, modal อ่านข่าว, News Reel วิดีโอ |
| `/media` | รวมวิดีโอ Remotion ทั้งหมด |
| `/contact` | ช่องทางติดต่อ, ฟอร์มส่งอีเมล, แผนที่ |

## เริ่มใช้งาน

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # สร้างไฟล์ไว้ที่ dist/
npm run preview
```

## Remotion

คอมโพสิชันอยู่ใน `src/remotion/` และดึงข้อมูลจาก `src/data/school.js` ชุดเดียวกับเว็บ

| ID | รายละเอียด |
| --- | --- |
| `SchoolIntro` | โลโก้, ปรัชญา “ปญฺญา โลกสฺมิ ปชฺโชโต”, ตัวเลขสำคัญ, อัตลักษณ์ |
| `NewsReel` | สไลด์ข่าวพร้อมทรานซิชัน (รับ `items` และ `label` เป็น props) |
| `StudentStats` | กราฟแท่งจำนวนนักเรียนแยกชั้น |

```bash
npm run remotion:studio                                   # เปิด Remotion Studio
npm run remotion:render                                   # เรนเดอร์ SchoolIntro เป็น out/school-intro.mp4
npx remotion render src/remotion/index.js NewsReel out/news.mp4
```

> Remotion ใช้งานฟรีสำหรับบุคคลและองค์กรขนาดเล็ก ดูเงื่อนไขที่ https://remotion.dev/license

## แก้ไขเนื้อหา

ข้อมูลทั้งหมด (ข่าว, ประวัติ, พันธกิจ, ข้อมูลนักเรียน, ลิงก์) อยู่ในไฟล์เดียว: `src/data/school.js`
รูปภาพอยู่ใน `public/images/`

## Deploy

เป็น SPA ที่ใช้ `BrowserRouter` จึงต้องตั้งให้เซิร์ฟเวอร์ส่ง `index.html` กลับไปทุกเส้นทาง
(Vercel ใช้ `vercel.json` ที่แนบมา, Netlify ใช้ `public/_redirects`)
