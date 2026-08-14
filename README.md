# 🌱 Eco Tashkent

Shahar ekologiyasi va buyumlar almashinuvi ekotizimi. Odamlar ishlatmayotgan buyumlarni (texnika, mebel, kitob va h.k.) bepul berishi, almashishi yoki xayriya qilishi, hamda yaqinidagi qayta ishlash/saralash punktlarini ko'rishi mumkin.

## Tarkib

| Qism | Papka | Stack | Deploy |
|---|---|---|---|
| Backend API | [`backend/`](backend) | Node.js, Express, Mongoose (MongoDB) | Render |
| Web (landing + bozor) | [`frontend/`](frontend) | Next.js (App Router), Tailwind CSS | Vercel |
| Telegram bot | [`bot/`](bot) | Node.js, node-telegram-bot-api | Render (Background Worker) |

API kontrakt: [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) — barcha model va endpointlar shu yerda batafsil.

## Tez ishga tushirish (lokal, 3 terminal)

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env      # MONGODB_URI ni to'ldiring
npm run seed               # 10 ta Toshkent qayta ishlash/saralash punktini yuklaydi
npm run dev                 # http://localhost:4000
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev                 # http://localhost:3000
```

### 3) Telegram bot
```bash
cd bot
npm install
cp .env.example .env        # BOT_TOKEN (@BotFather dan) va BACKEND_URL
npm start
```

## Deploy

**Backend → Render:** repo ulanadi, `render.yaml` root papkada tayyor (rootDir: `backend`). Dashboard'da `MONGODB_URI` env variable qo'shiladi.

**Bot → Render (Background Worker):** alohida service, rootDir `bot`, `BOT_TOKEN` va `BACKEND_URL` (backend'ning Render URL'i) env sifatida qo'shiladi.

**Frontend → Vercel:** repo ulanadi, Root Directory = `frontend`, `NEXT_PUBLIC_API_URL` env variable'ga backend'ning Render URL'i beriladi.

## Ma'lumot modellari

- **Item** — buyum: title, description, category (texnika/mebel/kitob/kiyim/bolalar/boshqa), type (bepul/almashish/xayriya), status, owner ma'lumotlari, district
- **RecyclingPoint** — qayta ishlash/saralash punkti: name, type, address, district, location (lat/lng), workingHours, acceptedMaterials

To'liq tafsilot: [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md)
