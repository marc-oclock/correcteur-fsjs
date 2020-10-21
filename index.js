const express = require('express');
const app = express();
var fs = require('fs');
var csv = require('csv-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use( express.static('depots'));
app.use( express.static('public'));

// const students = require('./games.json');
// app.locals.students = students;

app.get('/', (req, res) => {
  students = [];
  
  fs.createReadStream('students_nemo.csv')
    .pipe(csv())
    .on('data', (row) => {
      students.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(students);
      res.render('index', {students: students});
    });
});

app.get('/parcours/:pseudo', (req, res) => {
  app.locals.pseudo = req.params.pseudo;
  const path = '/depots/S01-parcours-html-css-' + req.params.pseudo  + '/';
  app.use(express.static(path));
  console.log(path);
  res.sendFile(__dirname + path + 'html/index.html');
  //res.redirect("file:///D:/014_oclock/promos/nemo/s01/S01-parcours-html-css-Fonzy-dev/html/index.html");
});

app.get('/css/:style_file', (req, res) => {
  const path = '/depots/S01-parcours-html-css-' + app.locals.pseudo  + '/';
  console.log(path);
  res.sendFile(__dirname + path + 'css/' + req.params.style_file);
});

app.get('/img/:img_file', (req, res) => {
  const path = '/depots/S01-parcours-html-css-' + app.locals.pseudo  + '/';
  console.log(path);
  res.sendFile(__dirname + path + 'img/' + req.params.img_file);
});

app.listen(5050, () => {
  console.log("listening on 5050");
});