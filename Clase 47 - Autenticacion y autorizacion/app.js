const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const usuarios = [];
let id = 1;

app.post('/registro', (req, res) => {
    const { nombre, apellido, email, contrasenia } = req.body;
    if (!nombre || !apellido || !email || !contrasenia) 
    {
        return res.status(400).send('Faltan datos. No se pudo crear usuario.');
    }
    const nuevoUsuario = {
        id,
        nombre,
        apellido,
        email,
        contrasenia
    }
    id++;
    usuarios.push(nuevoUsuario);
    res.status(200).send(nuevoUsuario);
});

app.listen(port, () => console.log('Escuchando el servidor...'));

