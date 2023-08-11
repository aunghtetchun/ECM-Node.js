const mongoose = require('mongoose');
const {Schema} =mongoose;

const DeliverySchema = new Schema({
    name: {type:String, required:true,unique:true},
    price: {type:Number, required:true},
    brand: {type:String, required:true},
    createdAt:[{type: Schema.Types.ObjectId,ref:'category'}],
    subcat:[{type: Schema.Types.ObjectId,ref:'subcat'}],
    childcat:[{type: Schema.Types.ObjectId,ref:'childcat'}],
    tag:[{type: Schema.Types.ObjectId,ref:'tag'}],
    discount: {type:Number, default:0},
    features: {type:String, required:true},
    desc: {type:String, required:true},
    detail: {type:String, required:true},
    status: {type:Boolean, default:true},
    delivery:[{type: Schema.Types.ObjectId,ref:'delivery'}],
    warranty:[{type: Schema.Types.ObjectId,ref:'warranty'}],
    colors: {type:Array,required:true},
    size: {type:String, required:true},
    rating: {type:String, default:'0'},
    images: {type:Array, required:true},
},{ 
    timestamps: true,
});

const Delivery = mongoose.model('delivery', DeliverySchema);

module.exports = Delivery;
