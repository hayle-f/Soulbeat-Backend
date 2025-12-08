import { registerController, loginController } from '../controllers/authController.js'
import express from 'express'
import { loginValidations, registerValidations } from '../validations/authValidations.js'
import { handleValidationErrors } from '../middleware/handleValidationsErrors.js'

const router = express.Router()

// Registro
router.post('/register', registerValidations(), handleValidationErrors, registerController)

// LogIn
router.post('/login', loginValidations(), handleValidationErrors, loginController)

export default router