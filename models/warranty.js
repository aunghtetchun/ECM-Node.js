const mongoose = require('mongoose');
const {Schema} =mongoose;

const WarrantySchema = new Schema({
    name: {type:String, required:true,unique:true},
    remark: {type:Array},
    image: {type:String, required:true},
},{ 
    timestamps: true,
});

const Warranty = mongoose.model('warranty', WarrantySchema);

module.exports = Warranty;
