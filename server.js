var http = require('http');
  var express = require('express');
  var app = express();
  var bodyParser = require("body-parser");
  var mongoose = require('mongoose');
  mongoose.connect("mongodb://localhost:27017/node-cw8");
  
  //var mongo = require('mongodb');
  //for local
  // var db. uri ="mongodb://localhost:27017";
  //for c9
 mongoose.connection.on('error',function(){
   console.log('Could not connect to mongodb');
 });
 
 var userSchema = new mongoose.Schema({
 name: {
   type: String,
   required: "Name is required"
 },
 email: String
 });
 var User = mongoose.model('User', userSchema);
  
 //var db, uri = "mongodb://" + process.env.IP + "/28017";
   
 /* mongo.MongoClient.connect(uri,{userNewUrlParser:true},function(err,client){
    if(err){console.log("Could not connect to MongoDB")
    }
    else {
      db = client.db('node-cw8');
     
    }
  });
  */
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
    var new_user = new User(req.body);
    new_user.save(function(err,data){
      if (err)
        return res.status(400).json({message: "could not save user"
      });
    
    res.status(200).json(data);
      })
    //save(req.body);
    //res.status('200');
  });
  
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });