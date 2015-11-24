var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var ideaSchema = new Schema({
	title: String,
	contents: String,
	tag: [String],
	dateAdded : { type: Date, default: Date.now }
})

// export 'Idea' model so we can interact with it in other files
module.exports = mongoose.model('Idea',ideaSchema);