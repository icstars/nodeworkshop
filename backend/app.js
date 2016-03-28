var express = require('express');
var app = express();
var database = require('./database.js');

var port = process.env.PORT || 1337;
//Set up to render the html correctly from the html folder
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname.replace('backend', 'frontend') + '/html');
app.use(express.static(__dirname.replace('backend', 'frontend')));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/', function(req,res){
  console.log('app / requested');
  return res.status(200).send("hello world");
});

app.get('/hi', function(req,res){
  console.log('app / requested');
  database.username = 'someone';
  console.log ('who: ' + database.who());
  return res.status(200).send("hi there programmer");
});

app.get('/trainList', function(req,res){
  console.log('app / trains requested');
  return res.render('trainList.html');
});

app.post('/addTrain', function(req,res){
  console.log('posted to /addTrain');
  console.log(JSON.stringify(req.body));
  var sql = `
   INSERT INTO trains (name,inService,numberOfAvailable) 
   VALUES ('${req.body.nameOfTrain}', '${req.body.inService}', '${req.body.availableTrains}');
  `;
   database.executeQuery(sql);
  return res.send("success");
});

app.get('/helloworld', function(req,res){
  console.log('app / helloworld requested');
  return res.render('helloworld.html');
});

app.get('/getTrains', function(req,res){
    database.executeQuery("SELECT * FROM trains", function(results) {
      res.send(results);
    });
});

app.listen(port, function(){
  console.log("Application is running:")
  console.log("Listening on " + port);
});
