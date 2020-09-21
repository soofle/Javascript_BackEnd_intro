//Instala sequelize
const Sequelize = require('sequelize');

//Instancia sequelize
const sequelize = new Sequelize('mysql://root@localhost:3306/clase49');


class Cancion {
    constructor(id, nombre, duracion, album, banda, fecha_publicacion){
        this.id = canciones[indexOf.id];
        this.nombre = nombre;
        this.duracion = duracion;
        this.album = album;
        this.banda = banda;
        this.fecha_publicacion = fecha_publicacion;
    }
    agregarCancion() {
        this.id++;
        sequelize.query('INSERT INTO canciones (nombre, duracion, album, banda, fecha_publicacion) VALUES (?, ?, ?, ?, ?)',
        {replacements: [this.nombre, this.duracion, this.album, this.banda, this.fecha_publicacion]})
        .then( resultados => {
            console.log(resultados);
        });   
    }

    listarCanciones() {
        sequelize.query('SELECT * FROM canciones', 
        { type: sequelize.QueryTypes.SELECT})
        .then( canciones => { 
        console.log(canciones);
        });  
    }

}

module.exports = {
    Cancion     
};