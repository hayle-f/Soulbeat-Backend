import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel.js'
import RoleModel from '../models/roleModel.js'
import { connectDB } from '../config/dbConfig.js'

dotenv.config()

async function createAdmin() {
    try {
        // Conectarse a la base de datos
        await connectDB()

        // Buscar rol de admin
        const adminRole = await RoleModel.findOne({ name: 'admin' })
        if (!adminRole) {
            console.log('Rol admin no encontrado. Ejecuta initializeRolesAndPermissions primero')
            return
        }

        // Verificar si ya existe un admin con ese email
        const existAdmin = await UserModel.findOne({ email: process.env.ADMIN_EMAIL })
        if (existAdmin) {
            console.log('Admin ya existe, no se crea otro')
            return
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

        // Crear el usuario admin
        const adminUser = new UserModel({
            username: 'Administrador',
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: adminRole._id
        })

        // Guardar en la DB
        await adminUser.save()
        console.log('Admin creado exitosamente')

    } catch (error) {
        console.error('Error creando admin:', error)
    } finally {
        // Desconectar de la DB
        await mongoose.disconnect()
        console.log('Desconectado de MongoDB')
    }
}

// Ejecutar el script
createAdmin()
