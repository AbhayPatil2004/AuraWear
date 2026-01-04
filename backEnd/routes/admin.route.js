import express from 'express'
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'
import { handelStoreOpeningReq } from '../controllers/admin.controller.js'
import handelUserAuthorization from '../middleware/authorized.middleware.js'

const router = express.Router()

router.get( "/storeopeningreq" , handelUserAuthentication , handelUserAuthorization , handelStoreOpeningReq )

export default router