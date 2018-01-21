const mongoose = require('mongoose');
const Schema = mongoose.Schema;


	let EventosSchema = new Schema({
		id 	   :{type:String,require:true},
		title  :{ type: String, require: true },
		start  :{ type: Date, require: true,  default: Date.now },
		end    :{ type: Date, require: true,  default: Date.now },
		start_hour:{type:String},
		end_hour:{type:String},
		allDay  :{ type: Boolean, require: true },
		id_user:{ type: String, require:true}		
	})
let EventoModel = mongoose.model('Evento', EventosSchema)
module.exports = EventoModel 