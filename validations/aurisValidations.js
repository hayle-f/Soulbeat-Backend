/*  */
import { body } from "express-validator"
import { normalizeString, normalizeBoolean, normalizeNumber, normalizeColorsAndCheckDuplicates } from '../utils/normalizers.js'
import { colors } from '../utils/colors.js'


export const aurisValidations = () => [

    //---------- Nombre obligatorio
    body('nombre')
        .customSanitizer(value => normalizeString(value, false))
        .notEmpty().withMessage('El nombre del auricular es obligatorio.').bail()
        .matches(/[a-zA-ZÁÉÍÓÚáéíóúÑñ]{3,}/)
        .withMessage('El nombre debe tener al menos 3 letras consecutivas.')
        .isLength({ max: 50 }).withMessage('El nombre debe tener como máximo 50 caracteres.'),

    // ---------- Tipo
    body('tipo')
        .customSanitizer(value => normalizeString(value, true)) 
        .notEmpty().withMessage('El tipo es obligatorio.')
        .isIn(['over-ear', 'on-ear', 'in-ear'])
        .withMessage('Debe seleccionar un tipo: over-ear, on-ear, in-ear.'),

    // ---------- Precio
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio.')
        .custom(value => {
            // normaliza y valida que sea número >= 0
            const n = normalizeNumber(value, 'float')
            if (isNaN(n)) throw new Error('Debe ser un número válido.')
            if (n < 0) throw new Error('El precio no puede ser menor que 0.')
            return true
        }),

    // ---------- Especificaciones (boolean)
    // Crea la validación de cada booleano y el '...' asegura que cada body() quede como middleware independiente al mismo nivel que las demás
    ...['inalambrico', 'resistenteAgua', 'cancelacionRuido', 'microfono'].map((esp) => 
        body(`especificaciones.${esp}`)
            .exists().withMessage(`El valor de ${esp} es obligatorio.`)
            .customSanitizer(normalizeBoolean)
            .isBoolean().withMessage('El valor debe ser Si o No')
    ),

    // ---------- Especificaciones DuracionBateria
    body('especificaciones.duracionBateria')
        .notEmpty().withMessage('La duración de batería es obligatoria.')
        .custom(value => {
            const n = normalizeNumber(value, 'float')
            if (isNaN(n)) throw new Error('Debe ser un número válido.')
            if (n < 0) throw new Error('La duración de batería no puede ser menor que 0.')
            return true
        }),

    // ---------- Items
    body('items')
        .isArray({ min: 1 }).withMessage('Debe haber al menos una variante.')
        .customSanitizer(normalizeColorsAndCheckDuplicates),

    // ---------- items-Imagen
    body('items.*.imagen')
        .notEmpty().withMessage('La imagen es obligatoria')
        // Valida que la cadena sea una URL que comience con "http://" o "https://"
        .custom(value => {
            if (!/^https?:\/\/.+/.test(value)) {
                throw new Error('La imagen debe ser una URL válida')
            }
            return true
        }),

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
        .custom(value => {
            const n = normalizeNumber(value, 'int')
            if (isNaN(n)) throw new Error('El stock debe ser un número válido.')
            if (n < 0) throw new Error('El stock no puede ser menor que 0.')
            return true
        })
]
