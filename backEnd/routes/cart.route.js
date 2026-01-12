import express from 'express'
import { handelClearCart , handelRemoveProductFromCart , handelAddProductInCart , handelGetCartProduct } from '../controllers/cart.controller.js'
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'

const router = express.Router()

router.get("getcartproducts" , handelUserAuthentication , handelGetCartProduct )
router.get("addproductincart" , handelUserAuthentication , handelAddProductInCart )
router.get("delproductfromcart" , handelUserAuthentication , handelRemoveProductFromCart )
router.post("clear" , handelGetCartProduct )

export default router