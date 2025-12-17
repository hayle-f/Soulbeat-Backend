//import { decodeJWT } from '../utils/decodeJWT.js'
import { CustomError } from '../utils/customErrors.js'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
            if (!authHeader) return next(new CustomError("No se proporcionó token", 401))

        const token = authHeader.split(' ')[1]
        
        // Verifica la firma y validez del token JWT usando la clave secreta.
        // Devuelve el payload decodificado si el token es válido, o lanza error si es inválido/expirado.

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        /* const decoded = decodeJWT(token)

        if (!decoded || Date.now() / 1000 > decoded.exp) {
            return next(new CustomError("Token inválido o expirado", 401))
        } */

        req.user = decoded // info del usuario disponible en req.user
        next()
    } catch (error) {
        next(new CustomError("Token inválido", 401))
    }
}