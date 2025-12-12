import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/dbConfig.js'
import soulbeatRoutes from './routes/soulbeatRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authRoutes from './routes/authRoutes.js'
import colorsRoutes from './routes/colorsRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send({ status: "OK", message: "Backend SoulBeat funcionando 🚀" })
})

app.use('/api', soulbeatRoutes)
app.use('/auth', authRoutes)
app.use('/api/colors', colorsRoutes)

app.use('/api/uploads/imgs', express.static('uploads/imgs'))
app.use('/api/uploads', uploadRoutes)

//manejo de errores inesperados
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' })
})

// Arrancar servidor después de conectar DB
connectDB()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`Servidor corriendo en: http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('No se pudo iniciar el servidor, error al conectar la DB:', err)
        process.exit(1)
    })
