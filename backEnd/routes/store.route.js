import express from 'express'
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'
import { handleCreateStore , handelGetAllStores , handelGetSearchedStore , handelClearStore } from '../controllers/store.controller.js'

const router = express.Router()

router.post(
  "/create",
  handelUserAuthentication,
  handleCreateStore
);

router.get("/" , handelGetAllStores)
router.post("/search" , handelGetSearchedStore )

router.delete("/clear" , handelClearStore)

export default router
 