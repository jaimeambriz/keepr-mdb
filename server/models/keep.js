var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	imageUrl: { type: String, required: true },
	views: { type: Number, default: 0 },
	saveCount: { type: Number, default: 0 },
	isPublic: { type: Boolean, required: true, default:true },
	// Relations
	vaultId: [{ type: ObjectId, ref: models.Vault, unique: true, dropDups: true }],
	creatorId: { type: ObjectId, ref: models.user.name, required: true }
});

module.exports = mongoose.model(models.keep.name, schema);