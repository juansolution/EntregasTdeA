const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyparser = require("body-parser");
let cursos = require("./dominio/cursos");

require("./helpers/helpers");
//const exphbs = require('express-handlebars');

const dirpublic = path.join(__dirname,"../public");
//const dirviews = path.join(__dirname,"./views");
const dirmodules = path.join(__dirname,"../node_modules");
const dirpartials = path.join(__dirname,"./partials")

app.use(express.static(dirpublic));
app.use('/css', express.static(dirmodules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirmodules + '/jquery/dist'));
app.use('/js', express.static(dirmodules + '/popper.js/dist'));
app.use('/js', express.static(dirmodules + '/bootstrap/dist/js'));
app.use(bodyparser.urlencoded({extended:false}));

/* se llama al engine view y se le settea que va ser hbs  */
app.set('view engine', 'hbs');

/* Registre las partials*/
console.log(dirpartials);
hbs.registerPartials(dirpartials);

/* Variables */
let listaCursos  = cursos.getCursos();//[{code:1,nombre:"Node Js"},{code:2, nombre:"Angular"},{code:3,nombre:"net core"}];



app.get('/',(req,res)=>{
    res.render('index',{
        usuario: "Juan Piedrahita"
    });
});



app.get('/promedio',(req,res)=>{
    res.render('promedio');
});

app.post('/promedioResult',(req,res)=>{
    console.log(req.body);
    res.render('promedioResult',{
        nombreestudiante: req.body.nombre,
        nota1: parseInt(req.body.nota1),
        nota2: parseInt(req.body.nota2),
        nota3: parseInt(req.body.nota3)

    });
});

app.get('/crearCurso',(req,res)=>{
    res.render('crearCurso');
});

app.post('/crearCursoResult',(req,res)=>{
    console.log("Entre");
    let nombre = req.body.nombre;
    let duracion = req.body.duracion;
    let costo = req.body.costo;
    let horario = req.body.horario;
    let curso = new cursos.curso(nombre,duracion,costo,horario);
    try{
        cursos.createCurso(curso);
        res.render('RespuestaExitosa',{resultado:"El curso se creo correctamente"});
    }
    catch{
        res.render('errorPage');
    }
    
});

app.get('/verCurso',(req,res)=>{
    res.render('verCurso',{
        listaCursos
    });
});

app.get('/InscribirEstudiante',(req,res)=>{

    res.render('InscribirEstudiante',{listaCursos});
});

app.post('/ResultInscribirEstudiante',(req,res)=>{
    
    res.render('RespuestaExitosa',{resultado:"Se pudo inscribir correctamente el curso."});
});

app.get('/verInscrito',(req,res)=>{
    res.render('verInscrito',{});
});

app.get("/api",(req,res)=>{
    res.send("test ok");
});

app.get('*',(req,res)=>{ 
    res.render('errorPage');

 });

app.listen(3001,()=>{console.log("Aplicacion iniciada por el puerto: 3001...")});
