const express = require('express');
const server = express();
const port = 1234;
///
/*
arr = [1,2,3,4]
arr.find( ... ) -> 2
arr.map( ... ) -> [2,4,6,8]
arr.forEach( console.log ) -> 1 2 3 4
*/
const alumnos = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Gonzalez',
        comision: 'dwfs'
    },
    {
        id: 2,
        nombre: 'Pedro',
        apellido: 'Martinez',
        comision: 'dwfs'
    },
    {
        id: 3,
        nombre: 'Pedro',
        apellido: 'Fernandez',
        comision: 'dwfs'
    },
    {
        id: 4,
        nombre: 'Esteban',
        apellido: 'Moreno',
        comision: 'dwa'
    },
    {
        id: 5,
        nombre: 'Pedro',
        apellido: 'Estevez',
        comision: 'dwa'
    },
    {
        id: 6,
        nombre: 'Lucas',
        apellido: 'Suarez',
        comision: 'dwa'
    },
    {
        id: 7,
        nombre: 'Esteban',
        apellido: 'Andrade',
        comision: 'bigdata'
    },
    {
        id: 8,
        nombre: 'Sebastian',
        apellido: 'Hernandez',
        comision: 'bigdata'
    },
    {
        id: 9,
        nombre: 'Lucas',
        apellido: 'Manso',
        comision: 'bigdata'
    }
];
server.get('/acamica/dwfs/alumnos', (solicitud, respuesta) => {
    const alumnosFiltrado = alumnos.filter(alumno => {
        const filtroPorComision = solicitud.query.comision;
        if (filtroPorComision) {
            return solicitud.query.comision === alumno.comision
        }
        return true
    });
    respuesta.send(alumnosFiltrado);
});
server.get('/acamica/dwfs/alumnos/:id', (solicitud, respuesta) => {
    const alumno = alumnos.find(alumno => alumno.id == solicitud.params.id);
    if (!alumno) {
        respuesta.statusCode = 404;
        respuesta.send('No existe ningún alumno con id ' + solicitud.params.id);
        return
    }
    respuesta.send(alumno);
});
server.listen(port, () => {
    console.log('Server listening on port', port)
});
server.listen(port, () => {
    console.log('Server listening on port')
});