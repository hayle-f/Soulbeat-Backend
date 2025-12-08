// Clase de error personalizada para el proyecto
// Permite lanzar errores con mensaje y código HTTP, que luego pueden ser manejados en controllers

export class CustomError extends Error {
    constructor(message, status) {
        super(message);       // mensaje del error
        this.status = status;  // código HTTP
        this.name = "CustomError"; // opcional, para identificar la clase
    }
}