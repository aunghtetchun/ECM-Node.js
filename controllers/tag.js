let DB = require("../models/tag");
const Helper = require("../utils/helper");

const all= async(req, res, next) => {
    let result= await DB.find();
    Helper.fMsg(res,"All tags",result);
}

const add = async (req, res, next) => {
  let dbTag = await DB.findOne({ name: req.body.name });
  if (dbTag) {
    next(new Error("tag name is already used"));
  } else {
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "tag Save Success", result);
  }
};
const get= async (req, res,next) => {
    const dbTag= await DB.findById(req.params.id);
    if (dbTag) {
        Helper.fMsg(res, "Single tag", dbTag);
    }else{
        next(new Error("no tag found"));
    }
}
const drop= async (req, res,next) => {
    const dbTag= await DB.findById(req.params.id);
    if (dbTag) {
        await DB.findByIdAndDelete(dbTag._id);
        Helper.fMsg(res, " tag Deleted");
    }else{
        next(new Error("no tag found"));
    }
}
const patch= async (req, res,next) => {
    const dbTag= await DB.findById(req.params.id);
    if (dbTag) {
        await DB.findByIdAndUpdate(dbTag._id,req.body);
        let result= await DB.findById(dbTag._id);
        Helper.fMsg(res,"Single tag update",result);
    }else{
        next(new Error("no tag found"));
    } 
}

module.exports = {
  add, 
  all,
  get,
  drop,
  patch
};
