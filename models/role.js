const mongoose = require('mongoose');
const {Schema} =mongoose;

const roleSchema = new Schema({
    name: {type:String, required:true},
    permits: [{type: Schema.Types.ObjectId, 'ref': 'permit'}]
},{
    timestamps: true,
});

const Role = mongoose.model('role', roleSchema)

module.exports = Role;
