/* // Middleware genérico para parsear valor automáticamente
export function parseValor(req, res, next) {
    let { valor } = req.params

    // detectar tipo automáticamente
    if (valor === "true") valor = true
    else if (valor === "false") valor = false
    else if (!isNaN(valor)) valor = Number(valor)
    // sino queda como string

    // guardar valor parseado en req para usar en el controller
    req.valorParseado = valor

    // pasar al siguiente middleware/controller
    next()
}
 */

export function parseValor(req, res, next) {
    let { atributo, valor } = req.params  // sacamos las 2 cosas de la URL

    // 🟡 Detectar rango solo si el atributo es "precio"
    if (atributo === "precio" && valor.includes("-")) {
        const partes = valor.split("-")  // ["5000", "10000"]
        req.valorParseado = partes.map(Number) // [5000, 10000]
        // comentario: lo guardamos como array de 2 nums
    } 
    // 🟢 Si no es rango, parseo automático normal
    else {
        if (valor === "true") req.valorParseado = true
        else if (valor === "false") req.valorParseado = false
        else if (!isNaN(valor)) req.valorParseado = Number(valor)
        else req.valorParseado = valor // string
        
    }

    next() // continuar al controller
}
