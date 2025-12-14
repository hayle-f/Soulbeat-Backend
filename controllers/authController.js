import AuthService from '../services/authService.js'

export async function registerController(req, res, next)  {
    try {
        const userData = req.body

        const result = await AuthService.register(userData)

        res.status(201).json(result) // 201 Created

    } catch (error) {
        next(error)
    }
}


export async function loginController(req, res, next)  {
    try {
        const { email, password } = req.body

        const { user, token } = await AuthService.login(email, password)

        res.status(200).json({ user, token }) //200 OK

    } catch (error) {
        next(error)
    }
}