let DB = require("../models/product");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  let dbProduct = await DB.findOne({ name: req.body.name });
  if (dbProduct) {
    next(new Error("Product already used"));
  } else {
    req.body.features = req.body.features.split(",");
    req.body.delivery = req.body.delivery.split(",");
    req.body.warranty = req.body.warranty.split(",");
    req.body.colors = req.body.colors.split(",");
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "All product", result);
  }
};


const get = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    Helper.fMsg(res, "Single product", dbDelivery);
  } else {
    next(new Error("no product found"));
  }
};
const drop = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    await DB.findByIdAndDelete(dbDelivery._id);
    Helper.fMsg(res, " product Deleted");
  } else {
    next(new Error("no product found"));
  }
};
const patch = async (req, res, next) => {
  const dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    req.body.remark = req.body.remark.split(",");
    await DB.findByIdAndUpdate(dbDelivery._id, req.body);
    let result = await DB.findById(dbDelivery._id);
    Helper.fMsg(res, "Single product update", result);
  } else {
    next(new Error("no product found"));
  }
};

module.exports = {
  add,
  get,
  drop,
  patch,
};
