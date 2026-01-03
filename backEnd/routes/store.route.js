import express from 'express'
import handelUserAuthentication from '../middleware/authenticate.js'
import { handelCreateStore  } from '../controllers/store.controller.js'

const router = express.Router()

router.post("/createstore" , handelUserAuthentication , handelCreateStore)