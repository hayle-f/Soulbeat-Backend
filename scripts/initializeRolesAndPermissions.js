import mongoose from 'mongoose'
import PermissionModel from '../models/PermissionModel.js'
import RoleModel from '../models/roleModel.js'
import dotenv from 'dotenv'
import { connectDB } from '../config/dbConfig.js'

dotenv.config()

// Definimos los permisos que queremos crear
const initialPermissions = [
    {
        name: 'read:auriculares',
        description: 'Puede ver auriculares'
    },
    {
        name: 'create:auriculares',
        description: 'Puede crear auriculares'
    },
    {
        name: 'update:auriculares',
        description: 'Puede actualizar auriculares'
    },
    {
        name: 'delete:auriculares',
        description: 'Puede eliminar auriculares'
    }
]

// Definimos los roles y qué permisos van a tener
const initialRoles = [
    {
        name: 'user',
        description: 'Usuario básico',
        permissions: ['read:auriculares']
    },
    {
        name: 'admin',
        description: 'Administrador del sistema',
        permissions: ['read:auriculares', 'create:auriculares', 'update:auriculares', 'delete:auriculares']
    }
]


async function initializeRolesAndPermissions() {
    try {
        await connectDB()
        
        /* 
        Recorro todos los elementos que quiero tener en la DB (permisos o roles). 
        Para cada uno busco si ya existe. 
        Si no existe, lo creo. 
        Para los permisos, guardo su ID en un map para poder asignarlos luego a los roles.
        */

        // Crear permisos solo si no existen (upsert)
        const permissionsMap = {}
        for (const perm of initialPermissions) {
            const p = await PermissionModel.findOneAndUpdate(
                { name: perm.name },        
                { $setOnInsert: perm },     
                { upsert: true, new: true } 
            )
            permissionsMap[p.name] = p._id
        }
        console.log('Permisos inicializados')

        // Crear roles solo si no existen
        for (const role of initialRoles) {
            const existingRole = await RoleModel.findOne({ name: role.name })
            if (existingRole) {
                console.log(`Rol "${role.name}" ya existe`)
                continue
            }

            // Reemplazar nombres de permisos por _id
            const rolePermissions = role.permissions.map(permName => {
                if (!permissionsMap[permName]) throw new Error(`Permiso ${permName} no encontrado`)
                return permissionsMap[permName]
            })

            await RoleModel.create({
                name: role.name,
                description: role.description,
                permissions: rolePermissions
            })
            console.log(`Rol "${role.name}" creado`)
        }

    } catch (error) {
        console.error('Error inicializando roles y permisos:', error)
    } finally {
        await mongoose.disconnect()
        console.log('Desconectado de MongoDB')
    }
}

initializeRolesAndPermissions()