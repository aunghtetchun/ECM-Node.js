const mongoose = require('mongoose');
const {Schema} =mongoose;

const SubCatSchema = new Schema({
    name: {type:String, required:true, unique:true},
    image: {type:String, required:true},
    catId:[{type: Schema.Types.ObjectId,ref:'category'}],
    childcats:[{type: Schema.Types.ObjectId,ref:'subcat'}],
},{
    timestamps: true,
});

const SubCat = mongoose.model('subcat', SubCatSchema);

module.exports = SubCat;
