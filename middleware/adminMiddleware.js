import { CustomError } from '../utils/customErrors.js'

export const adminMiddleware = (req, res, next) => {
    // req.user debe venir del authMiddleware
    if (!req.user) {
        return next(new CustomError("No autenticado", 401))
    }

    if (req.user.role !== "admin") {
        return next(new CustomError("Acceso denegado: solo administradores", 403))
    }

    next() // todo ok, sigue a la ruta
}