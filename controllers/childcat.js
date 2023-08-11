let DB = require("../models/childcat"); 
let SubCatDB = require("../models/subcat"); 
const Helper = require("../utils/helper");
const CatDB = require("../models/category");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "All childCategories", result);
};

const add = async (req, res, next) => {
  let dbChildCategory = await DB.findOne({ name: req.body.name });
  if (dbChildCategory) {
    next(new Error("ChildCategory name is already used"));
  } else {
    let dbSubCat = await SubCatDB.findById(req.body.subcatId);
    if (dbSubCat) {
      let result = await new DB(req.body).save();
      await SubCatDB.findByIdAndUpdate(dbSubCat._id, {
        $push: { childcats: result._id },
      });
      Helper.fMsg(res, "ChildCaegory Save Success", result);
    }
  }
};
const get = async (req, res, next) => {
  let dbChildCat = await DB.findById(req.params.id);
  if (dbChildCat) {
    Helper.fMsg(res, "Single childCategory", dbChildCat);
  } else {
    next(new Error("no childcategory found"));
  }
};
const drop = async (req, res, next) => {
  let dbChildCat = await DB.findById(req.params.id);
  if (dbChildCat) {
    await SubCatDB.findByIdAndUpdate(dbChildCat.subcatId, {
      $pull: { subcats: dbChildCat._id },
    });
    await DB.findByIdAndDelete(dbChildCat._id);
    Helper.fMsg(res, " childCategory Deleted");
  } else {
    next(new Error("no childCategory found"));
  }
};
const patch = async (req, res, next) => {
  let dbChildCat = await DB.findById(req.params.id);
  if (dbChildCat) {
    await DB.findByIdAndUpdate(dbChildCat._id, req.body);
    let result =await DB.findById(dbChildCat._id);
    Helper.fMsg(res, "Single childCategory update", result);
  } else {
    next(new Error("no childCategory found"));
  }
};

module.exports = {
  add,
  all,
  get,
  drop,
  patch,
};
