import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    // 🔗 Store owner (seller)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🏷 Store basic info
    storeName: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    // 🖼 Branding
    logo: {
      type: String, // Cloudinary URL
      default: "",
    },

    banner: {
      type: String, // Store banner image
      default: "",
    },

    // 📍 Store address (for pickup / returns)
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: {
        type: String,
        default: "India",
      },
    },

    // ⭐ Ratings & trust
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

    // 📦 Store stats
    totalProducts: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    // 🛂 Admin control
    isApproved: {
      type: Boolean,
      default: false, // admin must approve
    },

    isActive: {
      type: Boolean,
      default: true, // admin can disable store
    },

    // 💰 Commission (optional per store)
    commissionRate: {
      type: Number,
      default: 10, // 10% platform fee
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
