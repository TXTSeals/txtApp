var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');  
//module used to encrypt password data


var UserSchema = new Schema({
	name:{type: String, required: true},
	email:{ type:String, required:true},
	school:{ type: String, required:true},
	personalPhone:{ type: Number, required:false},
	parentPhone:{ type: Number, required:true},
	// checkIn:{ type:Number, required:true},
	// checkOut:{ type:Number, required:true}

})

module.exports = mongoose.model('User', UserSchema);