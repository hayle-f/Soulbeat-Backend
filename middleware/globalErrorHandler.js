export const globalErrorHandler = (err, req, res, next) => {
    // Mostramos el error en consola para depuración
    console.error('error:', err)

    // Si es un CustomError lanzado por nuestro servicio o controller
    if (err.name === 'CustomError') {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            mensaje: err.message,
            errores: err.errors || []
        })
    }

    // Para cualquier otro error inesperado
    res.status(500).json({
        status: 500,
        mensaje: 'Error interno del servidor'
    })
}