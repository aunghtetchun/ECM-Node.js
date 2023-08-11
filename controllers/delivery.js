let DB = require("../models/delivery");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "All delivery", result);
};

const add = async (req, res, next) => {
  let dbDelivery = await DB.findOne({ name: req.body.name });
  if (dbDelivery) {
    next(new Error("delivery name is already used"));
  } else {
    req.body.remark = req.body.remark.split(",");
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "delivery Save Success", result);
  }
};
const get = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    Helper.fMsg(res, "Single delivery", dbDelivery);
  } else {
    next(new Error("no delivery found"));
  }
};
const drop = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    await DB.findByIdAndDelete(dbDelivery._id);
    Helper.fMsg(res, " delivery Deleted");
  } else {
    next(new Error("no delivery found"));
  }
};
const patch = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    req.body.remark = req.body.remark.split(",");
    await DB.findByIdAndUpdate(dbDelivery._id, req.body);
    let result = await DB.findById(dbDelivery._id);
    Helper.fMsg(res, "Single delivery update", result);
  } else {
    next(new Error("no delivery found"));
  }
};

module.exports = {
  add,
  all,
  get,
  drop,
  patch,
};
