import express from 'express'
import { obtenerTodosAurisController, obtenerAuriPorIdController, crearNuevoAuriController, modificarAuriController, eliminarAuriController, obtenerAurisPorAtributoController, obtenerAurisPorAtributoNestedController } from '../controllers/aurisController.js'
import { parseValor } from '../middleware/parseParams.js'
import { aurisValidations } from '../validations/aurisValidations.js'
import { handleValidationErrors } from '../middleware/handleValidationsErrors.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddleware.js'


const router = express.Router()

// Obtener todos los Auriculares
router.get('/auriculares', obtenerTodosAurisController)

// Obtener un auricular por id
router.get('/auriculares/:id', obtenerAuriPorIdController)

// Crear nuevo Auricular
router.post('/auriculares', authMiddleware, adminMiddleware, aurisValidations(), handleValidationErrors, crearNuevoAuriController)

// Modificar auricular
router.put('/auriculares/:id', authMiddleware, adminMiddleware, aurisValidations(), handleValidationErrors, modificarAuriController)

// Eliminar auricular
router.delete('/auriculares/:id', authMiddleware, adminMiddleware, eliminarAuriController)

// Obtener auriculares por Atributo/Valor directo
router.get('/auriculares/filtro/:atributo/:valor', parseValor, obtenerAurisPorAtributoController)

// Obtener auriculares por Atributo/Valor anidado
router.get('/auriculares/filtro/nested/:atributo/:valor', parseValor, obtenerAurisPorAtributoNestedController)



export default router