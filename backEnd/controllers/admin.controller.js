import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendMailToUser from "../utils/sendMail.js";
import storeApprovedEmailBody from "../emailBody/storeApproves.emailBody.js";

async function handelStoreOpeningReq(req, res) {

    try {

        const stores = await Store.find({ isApproved: "pending" });

        if (!stores.length) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    [],
                    "No pending store approval requests"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                stores,
                "Pending stores fetched successfully"
            )
        );

    } catch (error) {
        console.error("Store approval fetch error:", error);

        return res.status(500).json(
            new ApiResponse(
                500,
                {},
                "Internal server error"
            )
        );
    }
}


async function handelApproveStore(req, res) {
    try {
        const { storeId } = req.params;

        const store = await Store.findById(storeId)
            .populate("owner", "username email");

        if (!store) {
            return res.status(404).json(
                new ApiResponse(404, {}, "Store not found")
            );
        }

        // calculate trial end date (7 days)
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 7);

        // update store
        store.isApproved = true;
        store.trialEndsAt = trialEndsAt;
        await store.save();

        const ownerId = store.owner._id;
        const ownerName = store.owner.username;
        const ownerEmail = store.owner.email;

        // update user role
        await User.findByIdAndUpdate(ownerId, {
            role: "seller"
        });

        // send email
        const subject = "Your Store is Approved";
        const body = storeApprovedEmailBody(ownerName, store.storeName);

        await sendMailToUser(ownerEmail, subject, body);

        return res.status(200).json(
            new ApiResponse(200, store, "Store approved successfully")
        );

    } catch (error) {
        console.error("Approve store error:", error);

        return res.status(500).json(
            new ApiResponse(500, {}, "Something went wrong")
        );
    }
}


export { handelStoreOpeningReq, handelApproveStore }