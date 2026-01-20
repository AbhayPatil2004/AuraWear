import Store from "../models/store.model.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendMailToUser from "../utils/sendMail.js";
import storeOpeningBody from "../emailBody/storeOpening.emailBody.js";
import mongoose from "mongoose";

async function handelGetStoreByIdForSeller(req, res) {
  try {
    const { storeId } = req.params;

    // 1️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json(
        new ApiResponse(400, {}, "Invalid Store ID")
      );
    }

    // 2️⃣ Fetch store
    const storeDetails = await Store.findById(storeId)
      .select(
        "storeName storeProducts description logo banner address rating reviews totalProducts totalOrders subscriptionPlan subscriptionStartDate subscriptionEndDate isSubscriptionActive trialEndsAt commissionRate productSales"
      )
      .populate("reviews");

    // 3️⃣ Not found check
    if (!storeDetails) {
      return res.status(404).json(
        new ApiResponse(404, {}, "Store not found")
      );
    }

    // 4️⃣ Success response
    return res.status(200).json(
      new ApiResponse(200, storeDetails, "Store details fetched successfully")
    );
  } catch (error) {
    console.error("Get Store Error:", error);
    return res.status(500).json(
      new ApiResponse(500, {}, "Internal server error")
    );
  }
}

async function handelGetStoreByOwner(req, res) {
  try {
    const { ownerId } = req.params;

    console.log("📥 Request received for ownerId:", ownerId);

    const owner = await User.findById(ownerId);
    console.log("👤 Owner fetched:", owner ? owner._id : "NOT FOUND");

    if (!owner) {
      console.log("❌ Owner not found");
      return res.status(404).json(
        new ApiResponse(404, null, "Owner not found with this id")
      );
    }

    const stores = await Store.find({ owner: ownerId })
      .select("storeName storeProducts logo banner");

    console.log("🏬 Stores fetched count:", stores.length);
    console.log("🏬 Stores data:", stores);

    if (stores.length === 0) {
      console.log("⚠️ No stores found for this owner");
      return res.status(404).json(
        new ApiResponse(404, [], "No stores found for this owner")
      );
    }

    console.log("✅ Sending stores response");

    return res.status(200).json(
      new ApiResponse(200, stores, "Stores sent successfully")
    );

  } catch (error) {
    console.error("🔥 Get Store Error:", error);
    return res.status(500).json(
      new ApiResponse(500, null, "Internal server error")
    );
  }
}

export { handelGetStoreByIdForSeller , handelGetStoreByOwner }