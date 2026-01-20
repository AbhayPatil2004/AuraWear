import express from 'express'
import handelUserAuthorization from '../middleware/seller.authorized.middleware.js'
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'
import { handelGetStoreByIdForSeller , handelGetStoreByOwner } from '../controllers/seller.controller.js'

const router = express.Router()

router.get("/store/:storeId" , handelUserAuthentication , handelUserAuthorization , handelGetStoreByIdForSeller )
router.get("/owner/:ownerId" , handelUserAuthentication , handelUserAuthorization , handelGetStoreByOwner )

export default router