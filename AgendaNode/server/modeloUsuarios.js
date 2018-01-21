const mongoose = require('mongoose');
const Schema = mongoose.Schema;


	let UserSchema = new Schema({		
		usuario:{ type: String, require: true },
		password:{ type: String, require:true}		
	})
let UserModel = mongoose.model('Usuario', UserSchema)
module.exports = UserModel 