# Eco Tashkent — API Contract (hackathon, tez versiya)

Backend base URL (dev): `http://localhost:4000`
Barcha routelar prefiksi: `/api`

## Model: Item (buyum)

```ts
{
  _id: string,
  title: string,               // majburiy
  description: string,         // majburiy
  category: "texnika" | "mebel" | "kitob" | "kiyim" | "bolalar" | "boshqa",
  type: "bepul" | "almashish" | "xayriya",
  status: "mavjud" | "band" | "berildi",   // default: "mavjud"
  imageUrl?: string,            // optional, tashqi link
  ownerName: string,            // majburiy
  ownerContact: string,         // telefon yoki telegram username, majburiy
  ownerTelegramId?: number,     // bot orqali yaratilsa to'ldiriladi
  district: string,             // masalan "Chilonzor", "Yunusobod", ...
  createdAt: string (ISO date)
}
```

## Model: RecyclingPoint (qayta ishlash/saralash punkti)

```ts
{
  _id: string,
  name: string,
  type: "qayta_ishlash" | "saralash",
  address: string,
  district: string,
  location: { lat: number, lng: number },
  workingHours: string,          // masalan "09:00-18:00"
  acceptedMaterials: string[]    // masalan ["plastik","qog'oz","shisha"]
}
```

## Endpointlar

### Items
- `GET /api/items` — query: `category`, `type`, `district`, `status`, `ownerTelegramId` (hammasi optional) — eng yangisi birinchi
- `GET /api/items/:id`
- `POST /api/items` — body: title, description, category, type, ownerName, ownerContact, district, imageUrl?, ownerTelegramId?
- `PATCH /api/items/:id` — body: { status } — masalan "band" yoki "berildi" qilib belgilash
- `DELETE /api/items/:id`

### Recycling Points
- `GET /api/points` — query: `district`, `type` optional
- `GET /api/points/:id`
- (POST/seed — admin ehtiyoji yo'q, backend seed skript orqali bir martalik to'ldiriladi)

### Health
- `GET /api/health` → `{ ok: true }`

## Javob formati

Muvaffaqiyatli: to'g'ridan-to'g'ri data (object yoki array).
Xatolik: `{ "error": "xabar matni" }` + mos HTTP status (400/404/500).

## Env

Backend: `PORT` (default 4000), `MONGODB_URI`
Frontend: `NEXT_PUBLIC_API_URL` (backend URL)
Bot: `BOT_TOKEN`, `BACKEND_URL`
