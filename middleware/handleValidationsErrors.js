import { validationResult } from "express-validator";


// Middleware que recoge los errores de validación generados por express-validator
// y responde con status 400 si hay alguno; si no, pasa al siguiente middleware/handler
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errores: errors.array() })
    }

    next()
}
