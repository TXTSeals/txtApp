let express = require('express');
let app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('./user');
var mongoose = require('mongoose');

var cors = require('cors');
var jwt = require('jsonwebtoken');
var secret = "fuzzywuzzy";

//serve our static files
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

 

//connect to the mongo db using moongose module
mongoose.connect('mongodb://localhost:27017/cubeData', function(err){
    if(err){
      console.log("error " + err);
    }else{
      console.log("mongoose connected");
    }
})



app.post('/signUp', jsonParser,function(req,res){
    var user= new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.school = req.body.school;
    user.personalPhone = req.body.personalPhone;
    user.parentPhone = req.body.parentPhone;
 

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({success:false,message:"Please make sure you fill out all of your information correctly!"});
        }else{
            console.log(user);
            res.json({success:true,message:"Cool! You successfully signed up!"})

        }

    });
});

app.get('/users', function(req,response){
    User.find({}, { name: true }, function(err, users) {
        response.json(users)
    })
})

// decipher our token in the client side
app.post('/me',function(req,res){
    res.send(req.decoded);
})

var port = 8080;
app.listen(port, () => console.log("listening on  " + port));
