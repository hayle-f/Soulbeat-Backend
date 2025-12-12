
export const decodeJWT = (token) => {
    try {
        const tokenData = token.split('.')[1] // parte del medio (payload)
        const decoded = Buffer.from(tokenData, 'base64').toString('utf-8') // Node usa Buffer en vez de atob
        return JSON.parse(decoded) // objeto JS
    } catch {
        return null
    }
}