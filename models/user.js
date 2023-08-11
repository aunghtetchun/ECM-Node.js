const mongoose = require('mongoose');
const {Schema} =mongoose;

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    phone: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    roles: [{type: Schema.Types.ObjectId, 'ref': 'role'}],
    permits: [{type: Schema.Types.ObjectId, 'ref': 'permit'}]
},{
    timestamps: true,
});

const User = mongoose.model('user', userSchema)

module.exports = User;
