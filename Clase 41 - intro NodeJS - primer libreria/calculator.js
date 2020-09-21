function suma(a, b){
    return a + b;
}

function resta(a, b){
    return a - b;
}

function multiplica(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

//Es un objeto lo que exporto y tomo desde otro archivo
module.exports = {
    sumar: suma,
    restar: resta,
    multiplicar: multiplica,
    dividir: divide
}