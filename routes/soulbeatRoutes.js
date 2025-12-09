import express from 'express'
import { obtenerTodosAurisController, obtenerAuriPorIdController, crearNuevoAuriController, modificarAuriController, eliminarAuriController, obtenerAurisPorAtributoController } from '../controllers/aurisController.js'
import { parseValor } from '../middleware/parseParams.js'
import { aurisValidations } from '../validations/aurisValidations.js'
import { handleValidationErrors } from '../middleware/handleValidationsErrors.js'


const router = express.Router()

// Obtener todos los Auriculares
router.get('/auriculares', obtenerTodosAurisController)

// Obtener un auricular por id
router.get('/auriculares/:id', obtenerAuriPorIdController)

// Crear nuevo Auricular
router.post('/auriculares', aurisValidations(), handleValidationErrors, crearNuevoAuriController)

// Modificar auricular
router.put('/auriculares/:id', aurisValidations(), handleValidationErrors, modificarAuriController)

// Eliminar auricular
router.delete('/auriculares/:id', eliminarAuriController)

// Obtener auriculares por Atributo/Valor directo
router.get('/auriculares/filtro/:atributo/:valor', parseValor, obtenerAurisPorAtributoController)

// Obtener auriculares por Atributo/Valor anidado
//router.get('/auriculares/filtro/nested/:atributo/:valor', parseValor, obtenerAurisPorAtributoNestedController)



export default router