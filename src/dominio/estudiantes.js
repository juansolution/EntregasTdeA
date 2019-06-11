const fs = require("fs");
const shortid = require('shortid');
let cursos = require("./cursos");
let listaEstudiantes = []; 


class estudiante {
    constructor(
        nombre, apellido, idenfificacion, tipoIdentificacion, cursos)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.idenfificacion = idenfificacion;
        this.tipoIdentificacion = tipoIdentificacion;
        this.cursos = cursos;
        
    }

}

let getstudiantes = ()=>{
   try{
    return listaEstudiantes = require("../Infrastructure/json/estudiantes.json");
   }
   catch{
    return listaEstudiantes = [];
   }
};
 
let createEstudiante = (estudiante)=>{ 
    getstudiantes();
    console.log(searchEstudiante(estudiante,(resp)=>{console.log(resp);}));
    /*
    if(searchEstudiante()){
        console("El Estudiantes se encuentra inscrito");
    }else{
        listaEstudiantes.push(estudiante);
        SaveLista(listaEstudiantes);
    }
    */
};

let SaveLista = (listaEstudiantes)=>{
    if(listaEstudiantes.length > 0){
        let dataout = JSON.stringify(listaEstudiantes);
        fs.writeFile('../Infrastructure/json/estudiantes.json',dataout,(error)=>{
            if(error){
                throw new Error("No se pudo insertar el estudiante.");
            }
            else{
                console.log("El registro se inserto correctamente.");
            }
        })
        
    }
};


let searchEstudiante = (estudiante,resp)=>{
    getstudiantes();

    listaEstudiantes.find(estu => {
        if( estu.idenfificacion == estudiante.idenfificacion ){
            resp = true;
            
        }
        else{
            
            resp = false;
        }

    });
    

};



/*Pruebas Con */

//let es = new estudiante("Juan", "Piedrahita", 71293257,"Cedula",ListCursos);


/*Pruebas Con CrearEstudiantes*/
//let ListCursos =  cursos.getCursos();
let es = new estudiante("Juan", "Piedrahita", 71293257,"Cedula",[]);
createEstudiante(es);



module.exports = {
    estudiante,
    createEstudiante

}