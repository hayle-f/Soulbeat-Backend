/*  */
// Normaliza un string: trim + reemplaza espacios múltiples por uno, opcionalmente lowercase
export const normalizeString = (value, lower = false) => {
    if (typeof value !== 'string') return ''
    const normalized = value.replace(/\s+/g, ' ').trim()
    return lower ? normalized.toLowerCase() : normalized
}

// Convierte a booleano: soporta true/false o 'si'/'no' en string
export const normalizeBoolean = (value) => {
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') {
        const v = value.toLowerCase()
        if (v === 'si' || v === 'true') return true
        if (v === 'no' || v === 'false') return false
    }
    return false // si no es reconocible, devuelve false por defecto
}

// Convierte a número (float o int), devuelve NaN si no se puede
export const normalizeNumber = (value, type = 'float') => {
    if (value === null || value === undefined || value === '') return NaN
    const n = type === 'int' ? parseInt(value) : parseFloat(value)
    return isNaN(n) ? NaN : n
}

// Normaliza colores de items (trim + lowercase) y chequea duplicados
export const normalizeColorsAndCheckDuplicates = (items) => {
    if (!Array.isArray(items)) return []
    const seen = new Set()
    return items.map(item => {
        if (!item.color) return item
        const color = normalizeString(item.color, true)
        if (seen.has(color)) throw new Error(`El color '${item.color}' está repetido.`)
        seen.add(color)
        return {
            ...item,
            color
        }
    })
}
