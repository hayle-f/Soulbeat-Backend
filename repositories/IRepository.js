// Clase base que define la interfaz de un repositorio genérico
// Todos los métodos deben ser implementados por las clases que extiendan esta interfaz

class IRepository {
    
    obtenerTodos() {
        throw new Error ("Metodo 'obtenerTodos()' no implementado.")
    }
    obtenerPorId(id) {
        throw new Error ("Metodo 'obtenerPorId()' no implementado.")
    }
    obtenerPorAtributo(atributo, valor) {
        throw new Error ("Metodo 'obtenerPorAtributo()' no implementado.");
    }
    crearNuevo(datosPais) {
        throw new Error ("Metodo 'crearNuevo()' no implementado.")
    }
    modificar(id, nuevosDatos) {
        throw new Error ("Metodo 'modificar()' no implementado.")
    }
    eliminar(id) {
        throw new Error ("Metodo 'eliminar()' no implementado.")
    }
    
}

export default IRepository;