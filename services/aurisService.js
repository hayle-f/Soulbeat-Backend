
import AuricularRepository from '../repositories/AuricularRepository.js'

export async function obtenerTodosAuris() {
    return await AuricularRepository.obtenerTodos()
}


export async function obtenerAuriPorId(id) {
    return await AuricularRepository.obtenerPorId(id)
}

export async function crearNuevoAuri(datosAuri) {
    return await AuricularRepository.crearNuevo(datosAuri)
}


export async function modificarAuri(id, nuevosDatos) {
    return await AuricularRepository.modificar(id, nuevosDatos)
}


export async function eliminarAuri(id) {
    return await AuricularRepository.eliminar(id) 
} 

export async function obtenerAurisPorAtributo(atributo, valor) {
    return await AuricularRepository.obtenerPorAtributo(atributo,valor)
}

export async function obtenerAurisPorAtributoNested(atributo, valor) {
    return await AuricularRepository.obtenerPorAtributoNested(atributo,valor)
}