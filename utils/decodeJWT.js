
// Decodifica el payload del JWT para leer id, rol y expiración.
export const decodeJWT = (token) => {
    try {
        const tokenData = token.split('.')[1] // parte del medio (payload)
        const decoded = Buffer.from(tokenData, 'base64').toString('utf-8') 
        return JSON.parse(decoded) // objeto JS
    } catch {
        return null
    }
}