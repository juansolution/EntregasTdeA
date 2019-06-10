
const fs = require('fs');
const shortid = require('shortid');

let listacursos = [];


class curso{
    
    constructor(nombre, duracion)
    {   
        if(nombre) this.id = shortid.generate();
        this.nombre = nombre;
        this.duracion = duracion;
    }
}

let getCursos = ()=>{
    try
    {
        return listacursos = require("../Infrastructure/json/cursos.json");
    }
    catch
    {
        return listacursos = [];
    }
    
};

let searchCursoxid = (findcurso)=>{
    getCursos();
    if(listacursos.length>0)
    {
        return listacursos.find(curso=> curso.id == findcurso);

    }else{
        return new curso;
    }

};

let searchCursoxnombre = (findcurso)=>{
    getCursos();
    if(listacursos.length>0)
    {
        return listacursos.find(curso=> curso.nombre == findcurso);

    }else{
        return new curso;
    }

};



let createCurso = (curso)=>{
    getCursos();
    listacursos.push(curso);
    if(listacursos.length>0){
        dateout = JSON.stringify(listacursos);
        

        fs.writeFile('../Infrastructure/json/cursos.json',dateout,(error)=>{
            console.log(error);
            if(error){ 
                throw new Error("No se pudo insertar el curso")
            }else{
                console.log("Curso gurdado correctamente.")
            };

        }); 
    }
}


//var c = new curso("node js",3);
//createCurso(c);

//console.log( searchCurso('0rKRnsaE2'));


module.exports={
    curso,
    getCursos,
    searchCursoxid,
    searchCursoxnombre

    
}
