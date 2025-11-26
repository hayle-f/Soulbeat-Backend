
import mongoose from "mongoose"

// Función para conectar a la base de datos MongoDB
export async function connectDB() {
    try {
        // Usar la URL definida en el archivo .env
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexión exitosa con MongoDB')
    } catch(err) {
        console.error('Error al conectar a MongoDB:', err)
        process.exit(1); // termina el proceso si falla la conexión
    }
}
