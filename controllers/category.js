let DB = require("../models/category");
const Helper = require("../utils/helper");

const all= async(req, res, next) => {
    let result= await DB.find().populate({
        path:'subcats',
        populate:{
            path: 'childcats',
            model: 'childcat'
        }
    });
    Helper.fMsg(res,"All Categories",result);
}

const add = async (req, res, next) => {
  let dbCategory = await DB.findOne({ name: req.body.name });
  if (dbCategory) {
    next(new Error("Category name is already used"));
  } else {
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Category Save Success", result);
  }
}; 
const get= async (req, res,next) => {
    const dbCat= await DB.findById(req.params.id);
    if (dbCat) {
        Helper.fMsg(res, "Single Category", dbCat);
    }else{
        next(new Error("no category found"));
    }
}
const drop= async (req, res,next) => {
    const dbCat= await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndDelete(dbCat._id);
        Helper.fMsg(res, " Category Deleted");
    }else{
        next(new Error("no category found"));
    }
}
const patch= async (req, res,next) => {
    const dbCat= await DB.findById(req.params.id);
    if (dbCat) {
        await DB.findByIdAndUpdate(dbCat._id,req.body);
        let result= await DB.findById(dbCat._id);
        Helper.fMsg(res,"Single Category update",result);
    }else{
        next(new Error("no category found"));
    } 
}

module.exports = {
  add, 
  all,
  get,
  drop,
  patch
};
