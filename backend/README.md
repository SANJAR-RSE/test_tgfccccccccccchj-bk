# Eco Tashkent — Backend

Node.js + Express + Mongoose API. To'liq API kontrakt: `../docs/API_CONTRACT.md`

## O'rnatish

```bash
npm install
```

## Sozlash

`.env.example` faylidan nusxa olib `.env` yarating va `MONGODB_URI` qiymatini o'zingizning MongoDB (masalan MongoDB Atlas) ulanish satri bilan to'ldiring:

```bash
cp .env.example .env
```

## Namuna ma'lumotlar bilan to'ldirish (seed)

RecyclingPoint kolleksiyasini tozalab, 10 ta Toshkent punkti bilan to'ldiradi:

```bash
npm run seed
```

## Ishga tushirish

```bash
npm run dev
```

Server `http://localhost:4000` manzilida ishga tushadi (yoki `.env` dagi `PORT`).

Tekshirish:

```bash
curl http://localhost:4000/api/health
```

## Endpointlar

- `GET /api/items`, `GET /api/items/:id`, `POST /api/items`, `PATCH /api/items/:id`, `DELETE /api/items/:id`
- `GET /api/points`, `GET /api/points/:id`
- `GET /api/health`

To'liq maydonlar, query parametrlar va javob formati uchun `../docs/API_CONTRACT.md` ga qarang.
