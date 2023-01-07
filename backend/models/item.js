import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    buyerId: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: true,
    },
    imageurl: {
      type: String,
    },
    cloudId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
