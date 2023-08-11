const DB= require('../models/permit');
const Helper= require("../utils/helper");

const add= async (req, res, next) =>{
  let dbPermit = await DB.findOne({ name: req.body.name });
  if (dbPermit){
    next(new Error("Permission name is already used"));
  }else{
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Permission Save Success", result);
  }
}
const all = async (req, res, next) => {
  let permits = await DB.find();
  Helper.fMsg(res, "All permits found", permits);
};
module.exports ={
  add,
  all
}