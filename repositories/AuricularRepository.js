import AuricularModel from '../models/auricularModel.js'
import IRepository from './IRepository.js';

class AuricularRepository extends IRepository {

    // Devuelve todos los auriculares
    async obtenerTodos() {
        return await AuricularModel.find({})
    }

     // Devuelve un auricular por su id
    async obtenerPorId(id) {
        return await AuricularModel.findOne({ id: id })
    }

    
    // Crea un nuevo auri en la base de datos
    async crearNuevo(datosAuri) {
        return await AuricularModel.create(datosAuri)
    }
    
    // Modifica un auri existente y devuelve el documento actualizado
    async modificar(id, nuevosDatos) {
        return await AuricularModel.findOneAndUpdate({ id: id }, nuevosDatos, {new: true})
    }

    // Elimina un auri por su id
    async eliminar(id) {
        return await AuricularModel.findOneAndDelete({ id: id })
    }

    // Devuelve auris filtrando por atributo dinámico directo
    async obtenerPorAtributo(atributo, valor) {

        // Si valor es un array de dos números y el atributo es precio -> rango
        if (Array.isArray(valor) && atributo === 'precio') {
            const [min, max] = valor
            return await AuricularModel.find({ precio: { $gte: min, $lte: max } })
        }
        return await AuricularModel.find({ [atributo]: valor })
    }    
    
    // Devuelve auris filtrando por atributo dinámico nested
    async obtenerPorAtributoNested(atributo, valor) {
        const camposEspecificaciones = ["inalambrico", "resistenteAgua", "cancelacionRuido", "microfono", "duracionBateria"]

        if (camposEspecificaciones.includes(atributo)) {
            if (atributo === "duracionBateria" && Array.isArray(valor)) {
                const [min, max] = valor
                return await AuricularModel.find({ [`especificaciones.${atributo}`]: { $gte: min, $lte: max } })
            }
            return await AuricularModel.find({ [`especificaciones.${atributo}`]: valor })
        }

        if (atributo === "color") {
            return await AuricularModel.find({ "items.color": valor })
        }
    }

}

export default new AuricularRepository 