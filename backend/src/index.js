require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const itemsRouter = require("./routes/items");
const pointsRouter = require("./routes/points");

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mongo connection — agar xato bo'lsa ham server crash bo'lmasin
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB'ga muvaffaqiyatli ulanildi"))
    .catch((err) => {
      console.error("MongoDB ulanish xatosi:", err.message);
    });
} else {
  console.error(
    "MONGODB_URI aniqlanmagan — .env faylini tekshiring. Server baribir ishga tushmoqda."
  );
}

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection xatosi:", err.message);
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/items", itemsRouter);
app.use("/api/points", pointsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint topilmadi" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Serverda kutilmagan xatolik yuz berdi" });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
