
// Normaliza un string: trim + reemplaza espacios múltiples por uno, opcionalmente lowercase
export const normalizeString = (value, lower) => {
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
    return value // si no es reconocible, devuelve valor
}

// Convierte a número (float o int), devuelve NaN si no se puede
export const normalizeNumber = (value, type = 'float') => {
    if (value === null || value === undefined || value === '') return NaN
    const n = type === 'int' ? parseInt(value) : parseFloat(value)
    return isNaN(n) ? NaN : n
}

// Normaliza colores de items (trim + lowercase)
export const normalizeColors = (items) => {
    return items.map(item => {
        if (!item.color) return item // no toca items sin color
        return { ...item, color: normalizeString(item.color, true) }
    })
}
