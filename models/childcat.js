const mongoose = require('mongoose');
const {Schema} =mongoose;

const ChildCatSchema = new Schema({
    name: {type:String, required:true, unique:true},
    image: {type:String, required:true},
    subcatId:[{type: Schema.Types.ObjectId,ref:'subcat'}],
},{
    timestamps: true,
});

const ChildCat = mongoose.model('childcat', ChildCatSchema);

module.exports = ChildCat;
