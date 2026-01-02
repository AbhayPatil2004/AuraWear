import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🔗 Relations
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🏷 Basic product info
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: 3,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
    },

    // 💰 Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
    },

    finalPrice: {
      type: Number,
    },

    // 👕 Variants
    sizes: {
      type: [String], // ["S", "M", "L", "XL"]
      default: [],
    },

    colors: {
      type: [String], // ["Black", "White"]
      default: [],
    },

    // 🖼 Images
    images: {
      type: [String], // Cloudinary URLs
      validate: [arr => arr.length > 0, "At least one image required"],
    },

    // 📦 Inventory
    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    // ⭐ Ratings
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // 🚦 Visibility
    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false, // soft delete
    },
  },
  { timestamps: true }
);

// 🔁 Auto-calculate final price
productSchema.pre("save", function (next) {
  this.finalPrice =
    this.price - (this.price * this.discountPercentage) / 100;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
