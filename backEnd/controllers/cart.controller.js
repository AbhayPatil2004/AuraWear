// controllers/cart.controller.js
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId })
            .populate("products.product", "_id")
            .populate("products.store", "_id")
            .populate("products.seller", "_id")
            .lean();

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: { user: userId, products: [] },
            });
        }

        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error: error.message,
        });
    }
};
