import express from 'express'
import { handleUserSignUp , handelVerifyEmailOtp , handelUserLogin , handelUserLogout , handelForgotPassword , handelClearUser} from "../controllers/user.controller.js"
import { handelUserAuthentication } from '../middleware/authenticate.middleware.js'

const router = express.Router()

router.post("/signup" , handleUserSignUp)
router.post("/verifyemail" , handelUserAuthentication , handelVerifyEmailOtp )
router.post("/login" , handelUserLogin ) 
router.post("/logout" ,  handelUserLogout )
router.post("/forgotpassword" ,  handelForgotPassword )

router.delete("/clear" , handelClearUser)

export default router 