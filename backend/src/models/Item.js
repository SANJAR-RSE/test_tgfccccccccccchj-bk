const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["texnika", "mebel", "kitob", "kiyim", "bolalar", "boshqa"],
      required: true,
    },
    type: {
      type: String,
      enum: ["bepul", "almashish", "xayriya"],
      required: true,
    },
    status: {
      type: String,
      enum: ["mavjud", "band", "berildi"],
      default: "mavjud",
    },
    imageUrl: {
      type: String,
      required: false,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerContact: {
      type: String,
      required: true,
      trim: true,
    },
    ownerTelegramId: {
      type: Number,
      required: false,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Item", ItemSchema);
