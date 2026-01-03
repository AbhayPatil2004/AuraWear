import express from 'express'
import { handleUserSignUp , verifyEmailOtp , handelUserLogin , handelUserLogout } from "../controllers/user.controller.js"
import { verifyAuthentication } from '../middleware/authenticate.js'

const router = express.Router()

router.post("/signup" , handleUserSignUp)
router.post("/verifyEmail" , verifyAuthentication , verifyEmailOtp )
router.post("/login" , handelUserLogin ) 
router.post("/logout" ,  handelUserLogout )

export default router 