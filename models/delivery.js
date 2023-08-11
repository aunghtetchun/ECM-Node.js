const mongoose = require('mongoose');
const {Schema} =mongoose;

const DeliverySchema = new Schema({
    name: {type:String, required:true,unique:true},
    price: {type:Number, required:true},
    duration: {type:String, required:true},
    remark: {type:Array},
    image: {type:String, required:true},
},{ 
    timestamps: true,
});

const Delivery = mongoose.model('delivery', DeliverySchema);

module.exports = Delivery;
