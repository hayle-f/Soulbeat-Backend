/*  */
import { body } from "express-validator"
import { normalizeString, normalizeBoolean, normalizeNumber, normalizeColors } from '../utils/normalizers.js'
import { colors } from '../utils/colors.js'


export const aurisValidations = () => [

    // --------- ID
    body('id')
        .notEmpty().withMessage('El ID es obligatorio.'),

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
        .notEmpty().withMessage('El precio es obligatorio.').bail()
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
            .exists().withMessage(`El valor de ${esp} es obligatorio.`).bail()
            .customSanitizer(normalizeBoolean)
            .isBoolean().withMessage('El valor debe ser Si o No')
    ),

    // ---------- Especificaciones DuracionBateria
    body('especificaciones.duracionBateria')
        .customSanitizer((value, { req }) => {
            // Si no es inalámbrico, siempre ponemos 0
            if (!req.body.especificaciones.inalambrico) return 0
            return value // si es inalámbrico, se usa el valor tal cual
        })
        .custom((value, { req }) => {
            const n = normalizeNumber(value, 'float')
            if (isNaN(n)) throw new Error('Debe ser un número válido.')

            if (req.body.especificaciones.inalambrico && n < 1) {
                throw new Error('La duración de batería debe ser 1h o mas')
            }

            return true
        }),

    // ---------- Items
    body('items')
        .isArray({ min: 1 }).withMessage('Debe haber al menos una variante.').bail()
        .customSanitizer(normalizeColors) // limpia los colores
        .custom(items => {
            const seen = new Set()
            items.forEach(item => {
            if (seen.has(item.color)) throw new Error(`El color '${item.color}' está repetido.`)
            seen.add(item.color)
            })
            return true
        }),

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
        .notEmpty().withMessage('El color es obligatorio.').bail()
        .custom(value => {
            if (!colors.hasOwnProperty(value)) throw new Error('El color no es válido.')
            return true
        }),

    // ---------- items-Stock
    body('items.*.stock')
        .notEmpty().withMessage('El stock es obligatorio.').bail()
        .custom(value => {
            const n = normalizeNumber(value, 'int')
            if (isNaN(n)) throw new Error('El stock debe ser un número válido.')
            if (n < 0) throw new Error('El stock no puede ser menor que 0.')
            return true
        })
]
