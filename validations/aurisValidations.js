import { body } from "express-validator"
import { normalizeLowerString, normalizeString } from '../utils/normalizers'


export const aurisValidations = () => [

    //---------- Nombre obligatorio
    body('nombre')
        .customSanitizer(normalizeString)
        .notEmpty().withMessage('El nombre del auricular es obligatorio.')
        .isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.'),

    // ---------- Tipo
    body('tipo')
        .notEmpty().withMessage('El tipo es obligatorio.')
        .customSanitizer(normalizeLowerString)
        //verifica que el valor esté dentro de las opciones válidas
        .isIn(['over-ear', 'on-ear', 'in-ear'])
        .withMessage('El tipo debe ser uno de: over-ear, on-ear, in-ear.'),

    // ---------- Precio
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio.')
        //verifica que el valor sea un número >= 0, 
        .isFloat({ min: 0 }).withMessage('El precio no puede ser negativo.')
        //convierte a Number por si vino como string
        .toFloat(),

    // ---------- Especificaciones (boolean)
    // Crea la validación de cada booleano y el '...' asegura que cada body() quede como middleware independiente al mismo nivel q las demas
    ...['inalambrico', 'resistenteAgua', 'cancelacionRuido', 'microfono'].map((esp) => {
        body(`especificaciones.${esp}`)
            .exists().withMessage(`El valor de ${esp} es obligatorio.`)
            .isBoolean().withMessage('El valor debe ser Si o No')
    }),

    // ---------- Especificaciones DuracionBateria
    body('especificaciones.duracionBateria')
        .notEmpty().withMessage('La duración de batería es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La duración de batería no puede ser negativa.')
        .toFloat(),

    // ---------- Items
    body('items')
        .notEmpty().withMessage('Debe haber al menos una variante.'),

    // ---------- items-Imagen
    body('items.*.imagen')
        .notEmpty().withMessage('La imagen es obligatoria.')
        .isURL().withMessage('La imagen debe ser una URL válida'),

    // ---------- items-Color
    body('items.*.color')
        .notEmpty().withMessage('El color es obligatorio.'),

    // ---------- items-Stock
    body('items.*.stock')
        .notEmpty().withMessage('El stock es obligatorio.')
        .isInt({ min: 0 }).withMessage('El stock debe ser un numero entero mayor a 0.')
        .toInt()


    
]