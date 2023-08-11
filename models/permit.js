const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
    name: {type:String, required:true, unique: true},
},{
    timestamps: true,
});

const Permit = mongoose.model('permit', permitSchema)

module.exports = Permit;