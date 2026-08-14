# Eco Tashkent — Telegram bot

Odamlar ishlatmayotgan buyumlarni (texnika, mebel, kitob va h.k.) bepul
berishi/almashishi/xayriya qilishi va yaqinidagi qayta ishlash/saralash
punktlarini ko'rishi mumkin bo'lgan Telegram bot. Node.js +
`node-telegram-bot-api` (polling rejimida), backend API bilan `axios`
orqali ishlaydi.

## O'rnatish

```bash
cd bot
npm install
```

## Sozlash

`.env.example` faylidan nusxa ko'chiring va `BOT_TOKEN` qiymatini kiriting:

```bash
cp .env.example .env
```

`.env` fayli:

```
BOT_TOKEN=<BotFather bergan token>
BACKEND_URL=http://localhost:4000
```

- `BOT_TOKEN` — @BotFather orqali olingan Telegram bot tokeni (majburiy).
- `BACKEND_URL` — backend API manzili (default: `http://localhost:4000`).

## Ishga tushirish

Backend server ishga tushgan bo'lishi kerak (`BACKEND_URL` manzilida).

```bash
npm start
```

`BOT_TOKEN` topilmasa, bot xato xabarini konsolga yozib, crash bo'lmasdan
to'xtaydi.

## Funksiyalar

- `/start` — salomlashish va asosiy menyu (reply keyboard).
- **📦 Buyumlar** — so'nggi 5 ta e'lonni ko'rsatadi (`GET /api/items`).
- **➕ Buyum joylash** — bosqichma-bosqich suhbat orqali yangi e'lon
  qo'shadi (nomi → tavsif → kategoriya → turi → tuman → aloqa) va
  `POST /api/items` orqali yuboradi.
- **♻️ Punktlar** — qayta ishlash/saralash punktlari ro'yxati
  (`GET /api/points`, 10 tagacha).
- **👤 Mening e'lonlarim** — foydalanuvchi joylagan e'lonlar
  (`GET /api/items?ownerTelegramId=...`).
- `/cancel` — joriy "buyum joylash" suhbatini bekor qilish.

## Papka tuzilishi

```
bot/
├── package.json
├── .env.example
├── README.md
└── src/
    ├── index.js      # bot logikasi (handlerlar, suhbat oqimi)
    ├── api.js         # backend bilan axios orqali ishlash
    └── keyboards.js   # reply/inline klaviaturalar
```
