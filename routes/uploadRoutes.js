import multer from "multer"
import fs from 'fs'
import path from "path"
import express from 'express'

const router = express.Router()

// Configurar Multer para guardar archivos temporalmente en 'uploads/tmp'
const upload = multer({ dest: 'uploads/tmp' })

// Endpoint para subir imagenes
router.post('/imgs', upload.single('imgVariante'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No se subió ningún archivo' })

    // obtener la extensión del archivo original
    const extension = path.extname(req.file.originalname)

    // Construir la nueva ruta final del archivo con extensión
    const newPath = `uploads/imgs/${req.file.filename}${extension}`

    // Mover/renombrar el archivo desde tmp a la carpeta final
    fs.renameSync(req.file.path, newPath)

    // construir la URL pública
    const urlImagen = `http://localhost:5000/imgs/${req.file.filename}${extension}`

    res.json({ url: urlImagen })
})

export default router