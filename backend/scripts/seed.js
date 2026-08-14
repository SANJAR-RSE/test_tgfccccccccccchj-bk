require("dotenv").config();

const mongoose = require("mongoose");
const RecyclingPoint = require("../src/models/RecyclingPoint");

const MONGODB_URI = process.env.MONGODB_URI;

const points = [
  {
    name: "Chilonzor qayta ishlash punkti",
    type: "qayta_ishlash",
    address: "Chilonzor tumani, Bunyodkor shoh ko'chasi 12",
    district: "Chilonzor",
    location: { lat: 41.2856, lng: 69.2034 },
    workingHours: "09:00-18:00",
    acceptedMaterials: ["plastik", "qog'oz", "shisha", "metall"],
  },
  {
    name: "Yunusobod saralash markazi",
    type: "saralash",
    address: "Yunusobod tumani, Amir Temur shoh ko'chasi 45",
    district: "Yunusobod",
    location: { lat: 41.3556, lng: 69.2879 },
    workingHours: "08:00-19:00",
    acceptedMaterials: ["plastik", "qog'oz", "karton"],
  },
  {
    name: "Mirzo Ulug'bek eko-punkti",
    type: "qayta_ishlash",
    address: "Mirzo Ulug'bek tumani, Universitet ko'chasi 7",
    district: "Mirzo Ulug'bek",
    location: { lat: 41.3308, lng: 69.3405 },
    workingHours: "09:00-18:00",
    acceptedMaterials: ["elektron chiqindilar", "batareyka", "metall"],
  },
  {
    name: "Yashnobod saralash punkti",
    type: "saralash",
    address: "Yashnobod tumani, Qo'yliq ko'chasi 23",
    district: "Yashnobod",
    location: { lat: 41.2947, lng: 69.3312 },
    workingHours: "08:00-17:00",
    acceptedMaterials: ["plastik", "shisha", "qog'oz"],
  },
  {
    name: "Sergeli qayta ishlash zavodi",
    type: "qayta_ishlash",
    address: "Sergeli tumani, Sergeli ko'chasi 101",
    district: "Sergeli",
    location: { lat: 41.2223, lng: 69.2245 },
    workingHours: "09:00-18:00",
    acceptedMaterials: ["plastik", "metall", "shisha"],
  },
  {
    name: "Bektemir saralash markazi",
    type: "saralash",
    address: "Bektemir tumani, Bektemir ko'chasi 15",
    district: "Bektemir",
    location: { lat: 41.2478, lng: 69.3529 },
    workingHours: "08:30-17:30",
    acceptedMaterials: ["qog'oz", "karton", "plastik"],
  },
  {
    name: "Shayxontohur eko-markaz",
    type: "qayta_ishlash",
    address: "Shayxontohur tumani, Navoi ko'chasi 34",
    district: "Shayxontohur",
    location: { lat: 41.3167, lng: 69.2401 },
    workingHours: "09:00-18:00",
    acceptedMaterials: ["kiyim-kechak", "poyabzal", "qog'oz"],
  },
  {
    name: "Olmazor saralash punkti",
    type: "saralash",
    address: "Olmazor tumani, Olmazor ko'chasi 8",
    district: "Olmazor",
    location: { lat: 41.3625, lng: 69.2156 },
    workingHours: "08:00-18:00",
    acceptedMaterials: ["plastik", "qog'oz", "shisha"],
  },
  {
    name: "Uchtepa qayta ishlash punkti",
    type: "qayta_ishlash",
    address: "Uchtepa tumani, Guliston ko'chasi 19",
    district: "Uchtepa",
    location: { lat: 41.3122, lng: 69.1897 },
    workingHours: "09:00-19:00",
    acceptedMaterials: ["metall", "plastik", "elektron chiqindilar"],
  },
  {
    name: "Yakkasaroy saralash markazi",
    type: "saralash",
    address: "Yakkasaroy tumani, Shota Rustaveli ko'chasi 5",
    district: "Yakkasaroy",
    location: { lat: 41.2889, lng: 69.2611 },
    workingHours: "08:00-17:00",
    acceptedMaterials: ["qog'oz", "karton", "shisha", "plastik"],
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI aniqlanmagan — .env faylini tekshiring.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB'ga ulanildi");

    await RecyclingPoint.deleteMany({});
    console.log("Eski RecyclingPoint ma'lumotlari tozalandi");

    await RecyclingPoint.insertMany(points);
    console.log(`${points.length} ta qayta ishlash/saralash punkti qo'shildi`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed xatosi:", err);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
}

seed();
