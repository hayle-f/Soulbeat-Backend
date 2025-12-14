// Clase de error personalizada para el proyecto
// Permite lanzar errores con mensaje y código HTTP, que luego pueden ser manejados en controllers

export class CustomError extends Error {
    constructor(message, statusCode = 400, errors = []) {
        super(message);
        this.statusCode = statusCode;  // Código HTTP
        this.errors = errors;          // Errores específicos (opcional)
        this.name = "CustomError";
    }
}