const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Importación de modelos
const modelos = require('./modelos')

// Ejemplo crear un cliente (id, nombre, apellido)
const cliente1 = new modelos.Cliente(1, 'Pepe', 'Grillo');

// Ejemplo crear dos cuentas (cbu, tipo, saldo)
const cuenta1 = new modelos.Cuenta(12345, 'CA', 100);
const cuenta2 = new modelos.Cuenta(12346, 'CC', 50);

// Agregar cuentas al cliente
cliente1.agregarCuenta(cuenta1);
cliente1.agregarCuenta(cuenta2);


