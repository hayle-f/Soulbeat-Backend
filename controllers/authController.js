import AuthService from '../services/authService.js'

export async function registerController(req, res)  {
    try {
        const userData = req.body

        const result = await AuthService.register(userData)

        res.status(201).json(result) // 201 Created

    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message })
    }
}


export async function loginController(req, res)  {
    try {
        const { email, password } = req.body

        const { user, token } = await AuthService.login(email, password)

        res.status(200).json({ user, token }) //200 OK

    } catch (error) {
        res.status(error.status || 500).json({ mensaje: error.message })
    }
}