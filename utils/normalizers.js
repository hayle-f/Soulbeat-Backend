
export const normalizeString = (value) => {
    if (typeof value === 'string') {
        //si es string, reemplaza todas las secuencias de espacios en blanco (espacios, tabs, saltos de línea, etc.) por un único espacio ' ', y eliminia espacios al inicio y final
        return value.replace(/\s+/g, ' ').trim()
    }
    return value
}

export const normalizeLowerString = (value) => {
    if (typeof value === 'string') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase()
    }
    return value
}
