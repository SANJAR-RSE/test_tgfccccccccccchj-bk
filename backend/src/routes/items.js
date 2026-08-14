const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");

const router = express.Router();

// GET /api/items — query: category, type, district, status, ownerTelegramId
router.get("/", async (req, res) => {
  try {
    const { category, type, district, status, ownerTelegramId } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (district) filter.district = district;
    if (status) filter.status = status;
    if (ownerTelegramId) filter.ownerTelegramId = Number(ownerTelegramId);

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Buyumlarni olishda xatolik yuz berdi" });
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri id formati" });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Buyum topilmadi" });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Buyumni olishda xatolik yuz berdi" });
  }
});

// POST /api/items
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      ownerName,
      ownerContact,
      district,
      imageUrl,
      ownerTelegramId,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !type ||
      !ownerName ||
      !ownerContact ||
      !district
    ) {
      return res.status(400).json({
        error:
          "title, description, category, type, ownerName, ownerContact, district majburiy",
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      type,
      ownerName,
      ownerContact,
      district,
      imageUrl,
      ownerTelegramId,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Buyum yaratishda xatolik yuz berdi" });
  }
});

// PATCH /api/items/:id — body: { status }
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri id formati" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "status maydoni majburiy" });
    }

    const allowedStatuses = ["mavjud", "band", "berildi"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `status quyidagilardan biri bo'lishi kerak: ${allowedStatuses.join(", ")}`,
      });
    }

    const item = await Item.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: "Buyum topilmadi" });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Buyumni yangilashda xatolik yuz berdi" });
  }
});

// DELETE /api/items/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri id formati" });
    }

    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: "Buyum topilmadi" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Buyumni o'chirishda xatolik yuz berdi" });
  }
});

module.exports = router;
