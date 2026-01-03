import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    
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

    logo: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

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

    totalProducts: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },
    
    isApproved: {
      type: Boolean,
      default: false, 
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    
    subscriptionPlan: {
      type: String,
      enum: ["trial", "basic", "pro", "premium"],
      default: "trial",
    },

    subscriptionStartDate: {
      type: Date,
    },

    subscriptionEndDate: {
      type: Date,
    },

    isSubscriptionActive: {
      type: Boolean,
      default: false,
    },
    
    trialEndsAt: {
      type: Date,
    },
    
    commissionRate: {
      type: Number,
      default: 0, 
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
