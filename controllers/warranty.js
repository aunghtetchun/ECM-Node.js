let DB = require("../models/warranty");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "All warranty", result);
};

const add = async (req, res, next) => {
  let dbWarranty = await DB.findOne({ name: req.body.name });
  if (dbWarranty) {
    next(new Error("warranty name is already used"));
  } else {
    req.body.remark = req.body.remark.split(",");
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "warranty Save Success", result);
  }
};
const get = async (req, res, next) => {
  const dbWarranty = await DB.findById(req.params.id);
  if (dbWarranty) {
    Helper.fMsg(res, "Single warranty", dbWarranty);
  } else {
    next(new Error("no warranty found"));
  }
};
const drop = async (req, res, next) => {
  const dbWarranty = await DB.findById(req.params.id);
  if (dbWarranty) {
    await DB.findByIdAndDelete(dbWarranty._id);
    Helper.fMsg(res, " warranty Deleted");
  } else {
    next(new Error("no warranty found"));
  }
};
const patch = async (req, res, next) => {
  const dbWarranty = await DB.findById(req.params.id);
  if (dbWarranty) {
    req.body.remark = req.body.remark.split(",");
    await DB.findByIdAndUpdate(dbWarranty._id, req.body);
    let result = await DB.findById(dbWarranty._id);
    Helper.fMsg(res, "Single warranty update", result);
  } else {
    next(new Error("no warranty found"));
  }
};

module.exports = {
  add,
  all,
  get,
  drop,
  patch,
};
