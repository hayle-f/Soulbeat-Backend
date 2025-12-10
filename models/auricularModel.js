import mongoose from "mongoose"


// Schema principal de auriculares
const auricularSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true
    },
    nombre: { 
        type: String, 
        required: true, 
        minlength: 3,  
        maxlength: 50
    },
    tipo: {
        type: String,
        enum: ['over-ear', 'on-ear', 'in-ear'],
        required: true
    },
    precio: { 
        type: Number, 
        required: true,
        min: 0
    },
    especificaciones: {         
        inalambrico: {type: Boolean, required: true },
        resistenteAgua: {type: Boolean, required: true },
        cancelacionRuido: {type: Boolean, required: true },
        microfono: {type: Boolean, required: true },
        duracionBateria: { type: Number, min: 0, required: true }
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
                required: true,
            },
            stock: { 
                type: Number, 
                required: true,
                min: 0
            },
            imagen: { 
                type: String, 
                required: true
            },
        }
    ]
}, { timestamps: true })

// Pre-save para generar ids de items automáticamente: productId-color
auricularSchema.pre('validate', function () {
    if (this.fromFront) return; // viene del frontend, no tocar IDs

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