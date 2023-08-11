const mongoose = require('mongoose');
const {Schema} =mongoose;

const TagSchema = new Schema({
    name: {type:String, required:true, unique:true},
    image: {type:String, required:true},
},{ 
    timestamps: true,
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;
