const express = require('express');
//pasiims metodus is siuncimos datos
let bodyParser = require('body-parser');

let app = express();
let fs = require('fs');
//iskoduos atsiustus duomenis  formdata[varas:kenrius] => {vardas: 'Kernius'}
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.listen(3000, '127.0.0.1', () => { console.log('Server is running on http://127.0.0.1:3000/')});

app.get("/", (req, res) => {
    let receptes = [];
    if(fs.existsSync('./public/receptai.txt')){
        receptes = fs.readFileSync('./public/receptai.txt', 'utf8');
        receptes = JSON.parse(receptes);
    }

    res.render('index', { receptes: receptes});
});

app.get("/new", (req, res) => {
    res.render('new');
});

app.post("/save",urlencodedParser, (req, res) => {
   let receptes = [];
    if(fs.existsSync('./public/receptai.txt')){
        receptes = fs.readFileSync('./public/receptai.txt', 'utf8');
        receptes = JSON.parse(receptes);
    }
    receptes.push(req.body);

    fs.writeFile('./public/receptai.txt', JSON.stringify(receptes));
    res.redirect('/');
});

//edit
app.get('/edit/:id?', (req,res) =>{
    let receptes = fs.readFileSync('./public/receptai.txt','utf8');
    receptes  = JSON.parse(receptes);
    res.render('edit', {id: req.params.id, recepte: receptes[req.params.id]});
})

app.post('/update/:id',urlencodedParser, (req,res) =>{
   let receptes = [];
   if(fs.existsSync('./public/receptai.txt')){
       receptes = fs.readFileSync('./public/receptai.txt', 'utf8');
       receptes = JSON.parse(receptes);
       receptes[req.params.id] = req.body;
       fs.writeFileSync('./public/receptai.txt', JSON.stringify(receptes));
    } 
    res.redirect('/');
});

app.delete('delete/:id', (req, res)=>{
    let receptes = [];
    if(fs.existsSync('./public/receptai.txt')){
        receptes = fs.readFileSync('./public/receptai.txt', 'utf8');
        receptes = JSON.parse(receptes);
        receptes.splice(req.params.id, 1);
        fs.writeFileSync('./public/receptai.txt', JSON.stringify(receptes));
    } 
    res.redirect('/'); // /visi
})

