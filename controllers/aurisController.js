import { obtenerTodosAuris, obtenerAuriPorId, crearNuevoAuri, modificarAuri, eliminarAuri, obtenerAurisPorAtributo } from "../services/aurisService.js"


// Obtener Todos
export async function obtenerTodosAurisController(req, res)  {
    try {
        const auris = await obtenerTodosAuris()

        //console.log('data obtenida en controller:', auris)

        res.json(auris)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener todos los auriculares', error: error.message })
    }
}

// Obetener por ID
export async function obtenerAuriPorIdController(req, res) {
    try {
        const { id } = req.params
        const auri = await obtenerAuriPorId(id)

        if(!auri) {
            return res.status(404).send({mensaje: 'Auricular no encontrado.'})
        }

        res.json(auri)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el auricular', error: error.message })
    }
}

// Crear nuevo
export async function crearNuevoAuriController(req, res) {
    try {
        const datosAuri = req.body
        const nuevoAuri = await crearNuevoAuri(datosAuri)
        
        res.json(nuevoAuri)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear nuevo Auricular', error: error.message }) 
    }
}

// Modificar Auri
export async function modificarAuriController(req, res) {
    try {
        const { id } = req.params
        //pedir datos que vienen fusionados del middleware
        const nuevosDatos = req.body
        /* console.log('Datos recibidos en req.body:', req.body); */

        const auriModificado = await modificarAuri(id, nuevosDatos)

        res.json(auriModificado)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al modificar el Auricular', error: error.message })
    }
}


// Eliminar por ID
export async function eliminarAuriController(req, res) {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ mensaje: 'ID no proporcionado' });
        }

        const auriEliminado = await eliminarAuri(id)

        if(!auriEliminado) {
            return res.status(404).send({mensaje: 'Auricular no encontrado.'})
        }

        res.json(auriEliminado)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el auricular', error: error.message })
    }
}

// obtener auriculares por un atributo/valor
export async function obtenerAurisPorAtributoController(req, res) {
    try {
        const { atributo } = req.params
        const valor = req.valorParseado
        const auris = await obtenerAurisPorAtributo(atributo, valor)

        if(auris.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron auriculares con ese atributo'})
        }

        res.json(auris)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al filtrar los auriculares', error: error.message });
    }
}

/* // obtener auriculares por un atributo/valor
export async function obtenerAurisPorAtributoNestedController(req, res) {
    try {
        const { atributo } = req.params
        const valor = req.valorParseado
        const auris = await obtenerAurisPorAtributoNested(atributo, valor)

        if(auris.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron auriculares con ese atributo'})
        }

        res.json(auris)

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al filtrar los auriculares', error: error.message });
    }
} */