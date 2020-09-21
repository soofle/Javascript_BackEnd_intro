//VERSION 2

const express = require('express');
const server = express();
const port = 3000;
const bodyParser = require('body-parser');
const models = require('./models.js');
const listOfAuthors = new models.ListOfAuthors()

server.use(bodyParser.json());

//// AUTORES ////
//GET: devuelve todos los autores
server.get('/autores', (req, res) => {  //agregar el middleware para array vacio
    res.status(200).send(listOfAuthors.read());
});

//POST: crea un nuevo autor
server.post('/autores', listOfAuthors.authorAlreadyExists, (req, res) => {
    const { nombre, apellido, fechaDeNacimiento } = req.body;
    listOfAuthors.create(nombre, apellido, fechaDeNacimiento, []);
    res.status(201).json(listOfAuthors.listAuthors[listOfAuthors.listAuthors.length -1]);
});

//GET: devuelve el autor con el id indicado
server.get('/autores/:id', listOfAuthors.authorDoesntExist, (req, res) => {
    res.status(200).json(listOfAuthors.readIdAuthor(req.params.id));
});

//PUT: modifica el autor con el id indicado
server.put('/autores/:id', listOfAuthors.authorDoesntExist, (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fechaDeNacimiento } = req.body;
    const updatedAuthor = listOfAuthors.update(id, nombre, apellido, fechaDeNacimiento);
    res.status(200).json(updatedAuthor);
});

//DELETE: elimina el autor con el id indicado
server.delete('/autores/:id', listOfAuthors.authorDoesntExist, (req, res) => {
    const { id } = req.params;
    listOfAuthors.delete(id);
    res.status(204).send();//no content
});

//// LIBROS ////
//GET: devuelve todos los libros de un autor
server.get('/autores/:id/libros', listOfAuthors.authorDoesntExist, (req, res) => {
    const { id } = req.params;
    res.status(200).send(listOfAuthors.readBooks(id));
});

//POST: agrega un nuevo libro al autor
server.post('/autores/:id/libros', listOfAuthors.authorDoesntExist, listOfAuthors.bookAlreadyExists, (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, anioPublicacion } = req.body;
    res.status(201).json(listOfAuthors.createLibro(id, titulo, descripcion, anioPublicacion));
});

//GET: devuelve el libro con el id indicado del autor
server.get('/autores/:id/libros/:idLibro', listOfAuthors.authorDoesntExist, listOfAuthors.bookDoesntExist, (req, res) => {
    const { id , idLibro } = req.params;
    res.status(200).json(listOfAuthors.readIdBook(id, idLibro));
});

//PUT: modifica el libro con el id indicado del autor
server.put('/autores/:id/libros/:idLibro', listOfAuthors.authorDoesntExist, listOfAuthors.bookDoesntExist, (req, res) => {
    const { id, idLibro } = req.params;
    const { titulo, descripcion, anioPublicacion } = req.body;
    res.status(200).json(listOfAuthors.updateBook(id, idLibro, titulo, descripcion, anioPublicacion));
});

//DELETE: eliminar el libro con el id indicado del autor
server.delete('/autores/:id/libros/:idLibro', listOfAuthors.authorDoesntExist, listOfAuthors.bookDoesntExist, (req, res) => {
    const { id, idLibro } = req.params;
    listOfAuthors.deleteBook(id, idLibro);
    res.status(204).send();//no content
});

server.listen(port, () => {
    console.log('Servidor Iniciado');
});