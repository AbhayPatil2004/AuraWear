import express from 'express'
import { handelGetProductReviews , handelAddProdcutReview , handelClearReview } from "../controllers/review.controller.js";

const router = express.Router()

router.get("/reviews" , handelGetProductReviews )
router.post("/addreview" , handelAddProdcutReview )

router.delete("/clear" , handelClearReview)

export default router