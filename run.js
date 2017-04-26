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
app.use(function(req,res,next){
    console.log("checking");
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if(token){
        console.log("token provided");
        jwt.verify(token, secret , function(err,decoded){
            if(err){
                 res.json({success:false, message: "Token is invalid"});
                next();

            }else{
                console.log("token decode");
                req.decoded = decoded;
                next();
            }
        })

    }else{
        console.log("no token provided");
        next();
    }
});


//connect to the mongo db using moongose module
mongoose.connect('mongodb://localhost:27017/loginExample', function(err){
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
            res.json({success:false,message:"Error! User could not be created"});
        }else{
            console.log(user);
            res.json({success:true,message:"User saved successfully ... Redirecting"})

        }

    });
});

// app.post('/login', jsonParser, function(req,res){
//     User.findOne({ name: req.body.name}).select('name email school personalPhone parentPhone').exec(function(err,user){
//         if(err){
//             throw err; 
//         }

//         if(!user){
//             res.json({success:false, message: 'User does not exist'});
//         }else if(user){
//             var validPassword = user.comparePassword(req.body.password);
//             if(!validPassword){
//                 res.json({success:false, message: 'Password invalid'});
//             }else{
//                 var token = jwt.sign({username: user.username, email: user.email}, secret,{expiresIn: '5h'});
//                 res.json({success:true, message: 'User logged In ....Redirecting', token: token});
//             }
//         }
//     })
// })




// decipher our token in the client side
app.post('/me',function(req,res){

    res.send(req.decoded);
})

var port = 8080;
app.listen(port, () => console.log("listening on  " + port));
