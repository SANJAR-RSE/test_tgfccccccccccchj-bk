const express = require("express");
const mongoose = require("mongoose");
const RecyclingPoint = require("../models/RecyclingPoint");

const router = express.Router();

// GET /api/points — query: district, type
router.get("/", async (req, res) => {
  try {
    const { district, type } = req.query;
    const filter = {};
    if (district) filter.district = district;
    if (type) filter.type = type;

    const points = await RecyclingPoint.find(filter).sort({ createdAt: -1 });
    res.json(points);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Punktlarni olishda xatolik yuz berdi" });
  }
});

// GET /api/points/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri id formati" });
    }

    const point = await RecyclingPoint.findById(id);
    if (!point) {
      return res.status(404).json({ error: "Punkt topilmadi" });
    }
    res.json(point);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Punktni olishda xatolik yuz berdi" });
  }
});

module.exports = router;
