import { body } from 'express-validator'
import { normalizeString } from '../utils/normalizers.js'

// Middlewares de validación de campos (username, email, password) para Express, solo a nivel de datos/inputs
export const registerValidations = () => [
    body('username')
        .customSanitizer(normalizeString)
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres'),

    body('email')
        .customSanitizer(normalizeString)
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
] 

export const loginValidations = () => [
    body('email')
        .customSanitizer(normalizeString)
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
]
