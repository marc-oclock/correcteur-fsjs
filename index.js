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

app.get('/', (request, response) => {
  students = [];
  
  fs.createReadStream('students_nemo.csv')
    .pipe(csv())
    .on('data', (row) => {
      students.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(students);
      response.render('index', {students: students});
    });
});

app.get('/parcours/:pseudo', (request, response) => {
  const path = '/depots/S01-parcours-html-css-' + request.params.pseudo  + '/html/index.html';
  app.use(express.static(path));
  console.log(path);
  response.sendFile(__dirname + path);
  //response.redirect("file:///D:/014_oclock/promos/nemo/s01/S01-parcours-html-css-Fonzy-dev/html/index.html");
});

// app.get('/game/:gameName', (request, response) => {
//   let goodGame;
//   goodGame = games.filter( (x) => x.name == request.params.gameName ).pop();
//   if (!goodGame) {
//     response.statusCode = 404;
//   }
//   response.render('game', {game: goodGame});
// });

app.listen(5050, () => {
  console.log("listening on 5050");
});