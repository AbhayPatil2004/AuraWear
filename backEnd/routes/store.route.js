import express from 'express'
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'
import { handleCreateStore , handelGetAllStores , handelGetSearchedStore} from '../controllers/store.controller.js'

const router = express.Router()

router.post(
  "/create",
  handelUserAuthentication,
  handleCreateStore
);

router.get("/" , handelGetAllStores)
router.post("/search" , handelGetSearchedStore )

export default router
 