import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        store: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Store",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        color : {
          type : String
        },
        size : {
          type : String
        },
        gender : {
          type : String ,
          enum :[ "male" , "female" , "unisex"]
        },
        price: {
          type: Number,
          required: true, 
        },
        finalPrice: {
          type: Number,
          required: true, 
        },
      },
    ],
   
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay", "Wallet", "Other"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "packed",
        "shipped",
        "out-for-delivery",
        "delivered",
        "cancelled",
        "returned"
      ],
      default: "pending",
    },
   
    trackingNumber: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
