let cursos = require("./cursos");

class estudiante {
    constructor(
        nombre, apellido, idenfificacion, tipoIdentificacion, cursos)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.idenfificacion = idenfificacion;
        this.tipoIdentificacion = tipoIdentificacion;
        
    }

}

let createEstudiante = ()=>{};

module.exports = {
    createEstudiante

}