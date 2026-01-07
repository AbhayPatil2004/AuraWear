import mongoose from "mongoose";

const sponsoredProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    
    priority: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const SponserProduct = mongoose.model("SponsserProduct" , sponsoredProductSchema)

export default SponserProduct
