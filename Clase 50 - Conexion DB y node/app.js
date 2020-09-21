const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Importación de modelos
const modelos = require('./modelos');

// const canciones = [];

app.post('/canciones', (req, res) => {
  const { nombre, duracion, album, banda, fecha_publicacion } = req.body; 
  
  const nuevaCancion = new Cancion(nombre, duracion, album, banda, fecha_publicacion);
  nuevaCancion.agregarCancion();

  res.status(201).json();
