import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/dbConfig.js'
import soulbeatRoutes from './routes/soulbeatRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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

app.use('/imgs', express.static('uploads/imgs'))
app.use('/api', uploadRoutes)

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
