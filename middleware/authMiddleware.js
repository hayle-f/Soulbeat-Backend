
import { decodeJWT } from '../utils/decodeJWT.js'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ mensaje: "No se proporcionó token" })

        const token = authHeader.split(' ')[1]
        const decoded = decodeJWT(token)

        if (!decoded || Date.now() / 1000 > decoded.exp) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" })
        }

        req.user = decoded // info del usuario disponible en req.user
        next()
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido" })
    }
}
