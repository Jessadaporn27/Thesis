# CodeLearn (Thesis Project)

เว็บแอปสำหรับเรียนเขียนโค้ดแบบ Interactive โดยมี:
- หน้าเรียนคอร์ส/บทเรียน
- Code Editor + Output Panel
- ตรวจคำตอบโจทย์
- AI Assistant (CodeBuddy) ผ่าน Ollama

## Stack

- React + Vite
- Monaco Editor
- Python runtime: Pyodide (รันใน Browser)
- JavaScript runtime: Browser runtime
- AI Chat: Ollama (`/api/ollama`)

## Run Local

> แนะนำ Node.js `20.19+` หรือ `22.12+` (Vite 7)

```bat
cd /d c:\Users\Administrator\Desktop\Thesis
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ URL จาก terminal (ปกติ `http://localhost:5173`)

## เปิดใช้งาน AI Chat (Ollama)

ฝั่ง Frontend เรียก ` /api/ollama ` และตอนรัน dev จะ proxy ไป `http://localhost:11434`

1) ติดตั้ง Ollama
2) เปิด Ollama server
3) ดาวน์โหลดโมเดล

```bat
ollama serve
ollama pull llama3.2
```

> ถ้าไม่เปิด Ollama ฟีเจอร์ AI จะใช้งานไม่ได้ แต่ฟีเจอร์เรียน/รันโค้ดยังใช้งานได้ตามปกติ

---

## Deploy บน Alibaba Cloud

มี 2 รูปแบบที่แนะนำ:

### ตัวเลือก A: Deploy แบบ Static (Alibaba OSS + CDN) — ง่ายสุด

เหมาะกับ:
- ต้องการ deploy หน้าเว็บเร็วที่สุด
- ยังไม่ต้องใช้ AI Chat ใน production

ขั้นตอน:
1. Build โปรเจกต์
2. อัปโหลดโฟลเดอร์ `dist/` ไปที่ OSS Bucket
3. เปิด Static Website Hosting ของ OSS
4. (แนะนำ) ผูก CDN และโดเมน

```bat
cd /d c:\Users\Administrator\Desktop\Thesis
npm install
npm run build
```

หลัง build เสร็จ ไฟล์ deploy จะอยู่ใน `dist/`

> หมายเหตุ: โหมดนี้จะไม่มี backend proxy ให้ `/api/ollama` จึงไม่รองรับ AI Chat เว้นแต่คุณทำ API เพิ่มเอง

---

### ตัวเลือก B: Deploy บน Alibaba ECS + Nginx (รองรับ AI ถ้าตั้งเพิ่ม)

เหมาะกับ:
- ต้องการควบคุมระบบเอง
- ต้องการใช้ AI Chat ผ่าน Ollama

สถาปัตยกรรมแนะนำ:
- Nginx เสิร์ฟไฟล์ frontend จาก `dist/`
- Route `/api/ollama` reverse proxy ไป Ollama (`http://127.0.0.1:11434` หรือ private IP)

#### 1) Build frontend

```bat
cd /d c:\Users\Administrator\Desktop\Thesis
npm install
npm run build
```

#### 2) นำไฟล์ `dist/` ขึ้น ECS

วางไว้เช่น `/var/www/codelearn/dist`

#### 3) ตั้งค่า Nginx

มีไฟล์ตัวอย่างที่ `deploy/nginx/default.conf`

จุดสำคัญ:
- `try_files` ต้อง fallback ไป `index.html` สำหรับ React Router
- เพิ่ม location `/api/ollama/` ให้ proxy ไป Ollama

#### 4) (ถ้าจะใช้ AI) ติดตั้ง/รัน Ollama บน ECS

```bash
ollama serve
ollama pull llama3.2
```

> เพื่อความปลอดภัย ควรปิดการเข้าถึงพอร์ต `11434` จาก public internet และให้เรียกผ่าน Nginx เท่านั้น

---

## Deploy ด้วย Docker (ทางเลือก)

มี `Dockerfile` ให้แล้ว (build React + serve ด้วย Nginx)

```bash
docker build -t codelearn-frontend:latest .
docker run -d --name codelearn-frontend -p 80:80 codelearn-frontend:latest
```

ถ้าจะใช้ AI ผ่าน container เดียวกัน ให้แก้ upstream ใน `deploy/nginx/default.conf` ให้ชี้ไปเครื่อง/บริการ Ollama ที่เข้าถึงได้

---

## Troubleshooting

- **Build เตือนเวอร์ชัน Node ต่ำ**
	- อัปเกรด Node.js เป็น `20.19+` หรือ `22.12+`

- **Refresh หน้าแล้วยิง 404**
	- ตรวจว่า Nginx ใช้ `try_files $uri $uri/ /index.html;`

- **AI ขึ้นเชื่อมต่อไม่ได้**
	- ตรวจว่า Ollama ทำงานอยู่
	- ตรวจว่า Nginx มี proxy `/api/ollama/`
	- ตรวจ Firewall/Security Group ว่าระบบภายในคุยกันได้
