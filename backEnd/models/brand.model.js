import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 50,
      index: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    logo: {
      type: String, 
    },

    country: {
      type: String,
      default: "Global",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalProducts: {
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
