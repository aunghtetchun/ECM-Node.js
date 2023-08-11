let DB = require("../models/role");
let PermitDB = require('../models/permit');
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let roles = await DB.find().populate('permits','-__v');
  Helper.fMsg(res, "All roles found", roles);
};
const get = async (req, res, next) => {
  let dbRole = await DB.findById(req.params.id);
  if (dbRole) {
    Helper.fMsg(res, "Single role found", dbRole);
  } else {
    next(new Error("Role not found"));
  }
};

const add = async (req, res, next) => {
  let dbRole = await DB.findOne({ name: req.body.name });
  if (dbRole) {
    next(new Error("Role name is already used"));
  } else {
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Permission Save Success", result);
  }
};
const patch = async (req, res, next) => {
  let dbRole = await DB.findById(req.params.id).select("-__v");
  if (dbRole) {
    await DB.findByIdAndUpdate(dbRole._id, req.body);
    let updateRole = await DB.findById(dbRole._id).select("-__v");
    Helper.fMsg(res, "Role updated successfully", updateRole);
  } else {
    next(new Error("No Role with that id"));
  }
};
const drop = async (req, res, next) => {
  let dbRole = await DB.findById(req.params.id).select("-__v");
  if (dbRole) {
    await DB.findByIdAndDelete(dbRole._id);
    Helper.fMsg(res, "Role deleted successfully");
  } else {
    next(new Error("No Role with that id"));
  }
};
const roleAddPermit = async (req, res, next) => {
  let dbRole = await DB.findById(req.body.roleId );
  let dbPermit = await PermitDB.findById(req.body.permitId);
  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(dbRole._id,{$push:{permits:dbPermit._id}});
    let result= await DB.findByIdAndUpdate(dbRole._id);
    Helper.fMsg(res, "Permission add to role Success", result);
  } else {
    next(new Error("Role name is already used"));

  }
};
const roleRemovePermit = async (req, res, next) => {
  let dbRole = await DB.findOne(req.body.roleId );
  let dbPermit = await PermitDB.findOne(req.body.permitId);
  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(dbRole._id,{$pull:{permits:dbPermit._id}});
    let result= await DB.findByIdAndUpdate(dbRole._id);
    Helper.fMsg(res, "Permission reove from role Success", result);
  } else {
    next(new Error("Role name is already used"));

  }
};
module.exports = {
  add,
  get,
  all,
  patch,
  drop,
  roleAddPermit,
  roleRemovePermit,
};
