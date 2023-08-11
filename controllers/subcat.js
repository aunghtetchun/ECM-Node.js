let DB = require("../models/subcat"); 
const Helper = require("../utils/helper");
const CatDB = require("../models/category");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "All subCategories", result);
};

const add = async (req, res, next) => {
  let dbSubCategory = await DB.findOne({ name: req.body.name });
  if (dbSubCategory) {
    next(new Error("SubCategory name is already used"));
  } else {
    let dbCat = await CatDB.findById(req.body.catId);
    if (dbCat) {
      let result = await new DB(req.body).save();
      await CatDB.findByIdAndUpdate(dbCat._id, {
        $push: { subcats: result._id },
      });
      Helper.fMsg(res, "SubCaegory Save Success", result);
    }
  }
};
const get = async (req, res, next) => {
  let dbSubCat = await DB.findById(req.params.id);
  if (dbSubCat) {
    Helper.fMsg(res, "Single subCategory", dbSubCat);
  } else {
    next(new Error("no subcategory found"));
  }
};
const drop = async (req, res, next) => {
  let dbSubCat = await DB.findById(req.params.id);
  if (dbSubCat) {
    await CatDB.findByIdAndUpdate(dbSubCat.catId, {
      $pull: { subcats: dbSubCat._id },
    });
    await DB.findByIdAndDelete(dbSubCat._id);
    Helper.fMsg(res, " subCategory Deleted");
  } else {
    next(new Error("no subcategory found"));
  }
};
const patch = async (req, res, next) => {
  let dbSubCat = await DB.findById(req.params.id);
  if (dbSubCat) {
    await DB.findByIdAndUpdate(dbSubCat._id, req.body);
    let result =await DB.findById(dbSubCat._id);
    Helper.fMsg(res, "Single subCategory update", result);
  } else {
    next(new Error("no subcategory found"));
  }
};

module.exports = {
  add,
  all,
  get,
  drop,
  patch,
};
