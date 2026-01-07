import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    wishlistProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    viewedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    
  },
  { timestamps: true }
);

const ReccomendProduct = mongoose.model("Recommendation" , recommendationSchema )

export default ReccomendProduct
