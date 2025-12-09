
// Normaliza un string: trim + reemplaza espacios múltiples por uno, opcionalmente lowercase
export const normalizeString = (value, lower) => {
    if (typeof value !== 'string') return ''
    const normalized = value.replace(/\s+/g, ' ').trim()
    return lower ? normalized.toLowerCase() : normalized
}

// Convierte a booleano, soporta true/false o 'si'/'no' en string
export const normalizeBoolean = (value) => {
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') {
        const v = value.toLowerCase()
        if (v === 'si' || v === 'true') return true
        if (v === 'no' || v === 'false') return false
    }
    return value
}

// Convierte a número (float o int), valida que sea >= min
export const normalizeNumber = (value, type = 'float', min = 0) => {
    const n = type === 'int' ? parseInt(value) : parseFloat(value)
    if (isNaN(n)) throw new Error('Debe ser un número válido.')
    if (n < min) throw new Error(`No puede ser menor que ${min}.`)
    return n
}

// Normaliza colores de items (trim + lowercase) y chequea duplicados
export const normalizeColorsAndCheckDuplicates = (items) => {
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