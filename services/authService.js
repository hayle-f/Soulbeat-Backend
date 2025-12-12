import userModel from '../models/userModel.js'
import RoleModel from '../models/roleModel.js'
import { CustomError } from '../utils/customErrors.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthService {

    //metodo para registrar nuevo user
    async register(userData) {
        //Verificar si existe un user con esa data
        const existUser = await userModel.findOne({
            $or: [
                { email: userData.email },
                { username: userData.username }
            ]
        })

        //si existe --> error
        if(existUser) {
            throw new CustomError('El usuario o email ya existe', 400)
        }

        //Encriptar password antes de crear
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        // Buscamos el rol por defecto
        const defaultRole = await RoleModel.findOne({ name: 'user' })

        if(!defaultRole){
            throw new CustomError('Rol no encontrado', 500)
        }

        // Creamos una nueva instancia del modelo User con los datos recibidos + rol 
        const newUser = new userModel({
            ...userData,
            password: hashedPassword,
            role: defaultRole._id
        })

        // Guardar el new user en la DB
        await newUser.save()

        // Poblar el rol para usarlo en el token
        await newUser.populate('role')

        // Convertir doc a objeto plano p manipulacion y eliminar password
        const userResponse = newUser.toObject()
        delete userResponse.password

        // Generar Token JWT para el usuario
        const token = this.generateToken(newUser)

        // Retornar usuario (sin passw) y token
        return {user: userResponse, token}

    }


    async login(email, password) {

         // Buscamos el usuario por email
        const user = await userModel.findOne({ email }).populate('role')

        if (!user) {
            throw new CustomError('Correo o contraseña incorrectos', 401)
        }

         // Verificamos si la contraseña es correcta
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new CustomError('Correo o contraseña incorrectos', 401)
        }

        // Convertir doc a objeto plano p manipulacion y eliminar password
        const userResponse = user.toObject()
        delete userResponse.password

        // Generar Token JWT para el usuario
        const token = this.generateToken(user)

        // Retornar usuario (sin passw) y token
        return {user: userResponse, token}      

    }


    // Método auxiliar para generar tokens JWT
    generateToken(user) {
        // Mapeo de roles a expiraciones de token
        const expirations = {
            user: '7d',
            admin: '8h',
        }

        // Tomamos la expiración según el rol del usuario; si no existe, usamos un valor por defecto
        const expiresIn = expirations[user.role.name] || '1d'

        // Información que vamos a incluir dentro del token
        // Esto es lo que el backend podrá verificar cuando el usuario haga requests
        const tokenData  = { 
                id: user._id,
                role: user.role.name
            }

        // Creamos y devolvemos el token que incluye el id, rol y permisos del usuario, usando la clave secreta del .env    
        return jwt.sign(
            tokenData, process.env.JWT_SECRET, { expiresIn }
        )
    }
}


export default new AuthService