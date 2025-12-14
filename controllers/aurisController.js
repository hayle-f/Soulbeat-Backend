import { obtenerTodosAuris, obtenerAuriPorId, crearNuevoAuri, modificarAuri, eliminarAuri, obtenerAurisPorAtributo, obtenerAurisPorAtributoNested } from "../services/aurisService.js"
import { CustomError } from "../utils/customErrors.js"


// Obtener Todos
export async function obtenerTodosAurisController(req, res, next)  {
    try {
        const auris = await obtenerTodosAuris()

        //console.log('data obtenida en controller:', auris)

        res.status(200).json(auris)

    } catch (error) {
        next(new CustomError('Error al obtener todos los auriculares', 500))
    }
}

// Obetener por ID
export async function obtenerAuriPorIdController(req, res, next) {
    try {
        const { id } = req.params
        const auri = await obtenerAuriPorId(id)

        if(!auri) {
            throw new CustomError('Auricular no encontrado', 404)
        }

        res.status(200).json(auri)

    } catch (error) {
        next(error)
    }
}

// Crear nuevo
export async function crearNuevoAuriController(req, res, next) {
    try {
        const datosAuri = req.body
        const nuevoAuri = await crearNuevoAuri(datosAuri)
        
        res.status(201).json(nuevoAuri)

    } catch (error) {
        next(new CustomError('Error al crear nuevo auricular', 500))
    }
}

// Modificar Auri
export async function modificarAuriController(req, res, next) {
    try {
        const { id } = req.params
        //pedir datos que vienen fusionados del middleware
        const nuevosDatos = req.body
        /* console.log('Datos recibidos en req.body:', req.body); */

        const auriModificado = await modificarAuri(id, nuevosDatos)

        if (!auriModificado) {
            throw new CustomError('Auricular no encontrado', 404)
        }

        res.status(200).json(auriModificado)

    } catch (error) {
        next(error)
    }
}


// Eliminar por ID
export async function eliminarAuriController(req, res, next) {
    try {
        const { id } = req.params

        if (!id) {
            throw new CustomError('ID no proporcionado', 400)
        }

        const auriEliminado = await eliminarAuri(id)

        if(!auriEliminado) {
            throw new CustomError('Auricular no encontrado', 404)
        }

        res.status(200).json(auriEliminado)

    } catch (error) {
        next(error)
    }
}

// obtener auriculares por un atributo/valor
export async function obtenerAurisPorAtributoController(req, res, next) {
    try {
        const { atributo } = req.params
        const valor = req.valorParseado
        const auris = await obtenerAurisPorAtributo(atributo, valor)

        if(auris.length === 0) {
            throw new CustomError('No se encontraron auriculares con ese atributo/valor', 404)
        }

        res.status(200).json(auris)

    } catch (error) {
        next(error)
    }
}

// obtener auriculares por un atributo/valor Nested
export async function obtenerAurisPorAtributoNestedController(req, res, next) {
    try {
        const { atributo } = req.params
        const valor = req.valorParseado
        const auris = await obtenerAurisPorAtributoNested(atributo, valor)

        if(auris.length === 0) {
            throw new CustomError('No se encontraron auriculares con ese atributo', 404)
        }

        res.json(auris)

    } catch (error) {
        next(error)
    }
}