import { validationResult } from "express-validator"
import { CustomError } from "../utils/customErrors.js"


// Middleware que recoge los errores de validación generados por express-validator
// y los convierte en un CustomError para que el middleware global los maneje
// Si no hay errores, pasa al siguiente middleware/controller

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        // En vez de responder directamente, lanzamos un CustomError
        return next(new CustomError("Errores de validación", 400, errors.array()))
    }

    next() 
}
