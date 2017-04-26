var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');  //module used to encrypt password data


var UserSchema = new Schema({
	name:{type: String, required: true},
	email:{ type:String, required:true},
	school:{ type: String, required:true},
	email:{ type:String, required:true},
	school:{ type: String, required:true}

})


UserSchema.pre('save', function(next){
	var user = this;


	UserSchema.methods.comparePassword = function(password){
		return bcrypt.compareSync(password,this.password);
	}

	module.exports = mongoose.model('User', UserSchema);
});