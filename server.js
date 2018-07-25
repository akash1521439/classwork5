var http = require('http');
  var express = require('express');
  var app = express();
  var bodyParser = require("body-parser");
  
  var mongo = require('mongodb');
  //for local
  // var db. uri ="mongodb://localhost:27017";
  //for c9

  
 var db, uri = "mongodb://" + process.env.IP + "/28017";
   
  mongo.MongoClient.connect(uri,{userNewUrlParser:true},function(err,client){
    if(err){console.log("Could not connect to MongoDB")
    }
    else {
      db = client.db('node-cw8');
     
    }
  });
  var save = function(form_data){
    db.createCollection('users', function(err, collection){});
    var collection = db.collection('users');
    collection.save(form_data);
  }
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({entended:true}));
  var server = http.Server(app);
  
  
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  })
  
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  
  app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  
  app.post('/form', function(req, res){
    console.log(req.body);
    save(req.body);
    res.status('200');
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });