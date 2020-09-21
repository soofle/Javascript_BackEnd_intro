const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Autores
const autores = require('./data')

let newAutorId = 1

const getAutorById = id => autores.find(autor => autor.id === parseInt(id))

const autorNotFound = (req, res, next) => {
  const { id } = req.params
  const exist = getAutorById(id)
  if (!exist) return res.status(404).json({ error: `El autor (id=${id}) no existe` })
  next()
}

const autorExist = (req, res, next) => {
  const { nombre, apellido } = req.body
  const exist = autores.find(autor => autor.nombre === nombre && autor.apellido === apellido)
  if (exist) return res.status(409).json({ error: `Ya existe el autor ${nombre} ${apellido}` })
  next()
}

app.use(bodyParser.json())

// Autores
app.get('/autores', (req, res) => {
  res.json(autores)
})

// Agrego un autor
app.post('/autores', autorExist, (req, res) => {
  const { nombre, apellido, fechaDeNacimiento } = req.body

  if (!nombre || !apellido) return res.status(400).json({ error: 'No puede agregar un autor sin nombre y/o apellido' })

  newAutorId++
  const newAutor = {
    id: newAutorId,
    nombre,
    apellido,
    fechaDeNacimiento,
    libros: []
  }

  autores.push(newAutor)

  res.status(201).json(newAutor)
})

// Obtengo un Autor por ID
app.get('/autores/:id', autorNotFound, (req, res) => {
  const { id } = req.params
  const autor = getAutorById(id)
  res.status(200).json(autor)
})

// Edito un Autor
app.put('/autores/:id', autorNotFound, (req, res) => {
  const { id } = req.params
  const { nombre, apellido, fechaDeNacimiento } = req.body
  
  // Obtengo el indice del array del autor que necesito
  const objIndex = autores.findIndex(autor => autor.id === parseInt(id))
  
  // Actualizo los datos
  autores[objIndex].nombre = nombre
  autores[objIndex].apellido = apellido
  autores[objIndex].fechaDeNacimiento = fechaDeNacimiento
  
  res.status(200).json(autores[objIndex])
})

app.delete('/autores/:id', autorNotFound, (req, res) => {
  const { id } = req.params
  
  // Obtengo el indice del array del autor que necesito
  const objIndex = autores.findIndex(autor => autor.id === parseInt(id))
  
  autores.splice(objIndex, 1)

  res.status(204).send()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
}