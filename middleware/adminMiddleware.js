
export const adminMiddleware = (req, res, next) => {
    // req.user debe venir del authMiddleware
    if (!req.user) {
        return res.status(401).json({ mensaje: "No autenticado" })
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ mensaje: "Acceso denegado: solo administradores" })
    }

  next() // todo ok, sigue a la ruta
}