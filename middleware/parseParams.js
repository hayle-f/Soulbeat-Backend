
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
