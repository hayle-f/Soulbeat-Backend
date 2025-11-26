import mongoose from "mongoose"


// Schema principal de auriculares
const auricularSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: [true, 'El id del producto es obligatorio'], 
        unique: true
    },
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'], 
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'], 
        maxlength: [90, 'El nombre no puede superar los 90 caracteres']
    },
    tipo: { 
        type: String, 
        required: [true, 'El tipo es obligatorio'],
        enum: {
            values: ["in-ear", "over-ear", "on-ear"],
            message: 'El tipo debe ser "in-ear", "over-ear" o "on-ear"'
        }
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    especificaciones: {         
        inalambrico: {type: Boolean, required: [true, 'La especificación inalambrico es obligatoria'] },
        resistenteAgua: {type: Boolean, required: [true, 'La especificación resistenteAgua es obligatoria'] },
        cancelacionRuido: {type: Boolean, required: [true, 'La especificación cancelacionRuido es obligatoria'] },
        microfono: {type: Boolean, required: [true, 'La especificación microfono es obligatoria'] },
        duracionBateria: { type: Number, min: [0, 'La duración de batería no puede ser negativa'], required: [true, 'La duración de batería es obligatoria'] }
    },
    items: [
        {
            id: { 
                type: String, 
                required: true, 
                unique: true
            },
            color: { 
                type: String, 
                required: [true, 'El color es obligatorio'],
            },
            stock: { 
                type: Number, 
                required: [true, 'El stock es obligatorio'],
                min: [0, 'El stock no puede ser negativo']
            },
            imagen: { 
                type: String, 
                required: [true, 'La imagen es obligatoria'],
                match: [/\.(jpg|jpeg|png)$/i, 'El archivo debe ser una imagen (.jpg, .jpeg o .png)']
            },
        }
    ]
})

// Pre-save para generar ids de items automáticamente: productId-color
auricularSchema.pre('validate', function () {
    if (this.items && this.items.length) {
        this.items = this.items.map(item => {
            if (!item.id) {
                item.id = `${this.id}-${item.color}`
            }
            return item
        })
    }
})


const AuricularModel = mongoose.model('Auricular', auricularSchema, 'auriculares')

export default AuricularModel