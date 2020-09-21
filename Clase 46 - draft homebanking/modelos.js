class Cliente {
    constructor(id, nombre, apellido){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cuentas = [];
    }
    
    agregarCuenta(cuenta){
        this.cuentas.push(cuenta);
    }
  }
  
class Cuenta {
    constructor(cbu, tipo, saldo){
        this.cbu = cbu; //El CBU es el ID 
        this.tipo = tipo; //Van a ser: caja ahorro, cuenta corriente, cuenta proyecto
        this.saldo = saldo;
    }

    //Ver si corresponde dentro de esta clase
    transferir(cuentaOrigen, cuentaDestino){
        //verificar que cuenta origen existe
        //verificar saldo en cuenta origen
        //verificar que cuenta destino existe
        //restar saldo en cuenta origen
        //sumar saldo en cuenta destino 
        //confirmar operacion
    }
}

module.exports = {
    Cliente,
    Cuenta    
};