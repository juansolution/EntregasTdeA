const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyparser = require("body-parser");

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


app.get('/',(req,res)=>{
    res.render('index',{
        usuario: "Juan Piedrahita"
    });
});

app.get('/testpartials',(req,res)=>{
    res.render('testpartial');
});

app.get('/promedio',(req,res)=>{
    res.render('promedio');
});

app.post('/promedioResult',(req,res)=>{
    res.render('promedioResult',{
        nombreestudiante: req.body.nombre,
        nota1: parseInt(req.body.nota1),
        nota2: parseInt(req.body.nota2),
        nota3: parseInt(req.body.nota3)

    });
});



app.get('*',(req,res)=>{ 
    res.render('errorPage');

 });

app.listen(3001,()=>{console.log("Aplicacion iniciada por el puerto 3001...")});
