import { body } from "express-validator"
import { normalizeString, normalizeBoolean, normalizeNumber, normalizeColorsAndCheckDuplicates } from '../utils/normalizers.js'
import { colors } from '../utils/colors.js'


export const aurisValidations = () => [

    //---------- Nombre obligatorio
    body('nombre')
        .customSanitizer(value => normalizeString(value, false))
        .notEmpty().withMessage('El nombre del auricular es obligatorio.')
        .isLength({ max: 50 }).withMessage('El nombre debe tener como máximo 50 caracteres.')
        .matches(/[a-zA-ZÁÉÍÓÚáéíóúÑñ]{3,}/)
        .withMessage('El nombre debe tener al menos 3 letras consecutivas.'),

    // ---------- Tipo
    body('tipo')
        .customSanitizer(value => normalizeString(value, true)) 
        .notEmpty().withMessage('El tipo es obligatorio.')
        .isIn(['over-ear', 'on-ear', 'in-ear'])
        .withMessage('El tipo debe ser uno de: over-ear, on-ear, in-ear.'),

    // ---------- Precio
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio.')
        .custom(value => normalizeNumber(value, 'float', 0)),

    // ---------- Especificaciones (boolean)
    // Crea la validación de cada booleano y el '...' asegura que cada body() quede como middleware independiente al mismo nivel q las demas
    ...['inalambrico', 'resistenteAgua', 'cancelacionRuido', 'microfono'].map((esp) => 
        body(`especificaciones.${esp}`)
            .exists().withMessage(`El valor de ${esp} es obligatorio.`)
            .customSanitizer(normalizeBoolean)
            .isBoolean().withMessage('El valor debe ser Si o No')
    ),

    // ---------- Especificaciones DuracionBateria
    body('especificaciones.duracionBateria')
        .notEmpty().withMessage('La duración de batería es obligatoria.')
        .custom(value => normalizeNumber(value, 'float', 0)),

    // ---------- Items
    body('items')
        .isArray({ min: 1 }).withMessage('Debe haber al menos una variante.')
        .customSanitizer(normalizeColorsAndCheckDuplicates),

    // ---------- items-Imagen
    body('items.*.imagen')
        .customSanitizer(value => normalizeString(value, false)) 
        .notEmpty().withMessage('La imagen es obligatoria.')
        .isURL({ protocols: ['http','https'], require_protocol: true }).withMessage('La imagen debe ser una URL válida'),

    // ---------- items-Color
    body('items.*.color')
        .notEmpty().withMessage('El color es obligatorio.')
        .custom(value => {
            if (!colors.hasOwnProperty(value)) throw new Error('El color no es válido.')
            return true
        }),

    // ---------- items-Stock
    body('items.*.stock')
        .notEmpty().withMessage('El stock es obligatorio.')
        .custom(value => normalizeNumber(value, 'int', 0))

]