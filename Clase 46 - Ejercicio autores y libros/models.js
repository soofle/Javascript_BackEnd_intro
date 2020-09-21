class Book {
    constructor(idLibro, titulo, descripcion, anioPublicacion) {
        this.idLibro = idLibro;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.anioPublicacion = anioPublicacion;
    };
};

class Author {
    constructor(id, nombre, apellido, fechaDeNacimiento, libros) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.libros = libros;
    };
};


class ListOfAuthors {
    constructor() {
        this.id = 0;
        this.listAuthors = [];
        this.idLibro = 0;
    };

    //// AUTORES ////
    //GET: devuelve todos los autores
    read() {
        return this.listAuthors;
    };

    //GET: devuelve el autor con el id indicado
    readIdAuthor(id) {
        const author = this.listAuthors.find(author => author.id === parseInt(id));
        return author;
    };

    //POST: crea un nuevo autor
    create(nombre, apellido, fechaDeNacimiento, libros) {
        this.id++
        const author = new Author(this.id, nombre, apellido, fechaDeNacimiento, libros);
        this.listAuthors.push(author);    
    };

    //PUT: modifica el autor con el id indicado
    update(id, nombre, apellido, fechaDeNacimiento) {
        const author = this.listAuthors.find(author => author.id === parseInt(id));
        author.nombre = nombre;
        author.apellido = apellido;
        author.fechaDeNacimiento = fechaDeNacimiento;
        return author;
    };

    //DELETE: elimina el autor con el id indicado
    delete(id) {
        const author = this.readIdAuthor(id);
        this.listAuthors.splice(author, 1);
    };

    //// LIBROS ////
    readBooks(id) {
        const author = this.readIdAuthor(id);
        return author.libros;
    };

    readIdBook(id, idLibro) {
        const books = this.readBooks(id);
        const book = books.find(book => book.idLibro === parseInt(idLibro));
        return book;
    };

    //POST: agrega un nuevo libro al autor
    createLibro(id, titulo, descripcion, anioPublicacion) {
        this.idLibro++
        const author = this.readIdAuthor(id);
        const book = new Book(this.idLibro, titulo, descripcion, anioPublicacion);
        author.libros.push(book);
        return book;
    };

    //PUT: modifica el libro con el id indicado del autor
    updateBook(id, idLibro, titulo, descripcion, anioPublicacion) {
        const book = this.readIdBook(id, idLibro);
        book.titulo = titulo;
        book.descripcion = descripcion;
        book.anioPublicacion = anioPublicacion;
        return book;
    };

    //DELETE: eliminar el libro con el id indicado del autor
    deleteBook(id, idLibro) {
        const author = this.readIdAuthor(id);
        const book = this.readIdBook(id, idLibro);
        author.libros.splice(book, 1);
    };

    /// Middleware ///
    authorAlreadyExists = (req, res, next) => {
        const { nombre, apellido } = req.body;
        const exist = this.listAuthors.find(author => author.nombre === nombre && author.apellido === apellido);
        if (exist) {
            return res.status(409).json({ error: `Ya existe el autor ${nombre} ${apellido}`});
        };
        next();
    };

    authorDoesntExist = (req, res, next) => {
        const { id } = req.params;
        const author = this.listAuthors.find(author => author.id === parseInt(id));
        if (!author) {
            return res.status(404).json({ error: `El autor (id=${id}) no existe`})
        };
        next()
    };

    bookAlreadyExists = (req, res, next) => {
        const { id } = req.params;
        const { titulo } = req.body;
        const author = this.readIdAuthor(id);
        const exist = author.libros.find(libro => libro.titulo === titulo);
        if (exist) {
            return res.status(409).json({ error: `Ya existe el libro ${titulo}`});
        };
        next();
    };

    bookDoesntExist = (req, res, next) => {
        const { id, idLibro } = req.params;
        const book = this.readIdBook(id, idLibro);
        if (!book) {
            return res.status(404).json({ error: `El libro (id=${idLibro}) no existe`})
        };
        next();
    };
};


module.exports = { Book, Author, ListOfAuthors };
