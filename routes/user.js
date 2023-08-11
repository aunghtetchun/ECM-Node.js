const router = require("express").Router();
const controller = require("../controllers/user");
const { UserSchema } = require("../utils/schema");
const { validateBody, validateParam, validateRole,validateToken } = require("../utils/validator");
 
// Add routes  
router.post("/register", [validateBody(UserSchema.register), controller.register]);
router.post("/", [validateBody(UserSchema.login), controller.login]);
router.post('/add/role',[validateToken(),validateRole("Owner"),validateBody(UserSchema.addRole),controller.addRole]);
router.post('/remove/role',[validateToken(),validateRole("Owner"),validateBody(UserSchema.addRole),controller.removeRole]);
router.post('/add/permit',[validateToken(),validateRole("Owner"),validateBody(UserSchema.addPermit),controller.addPermit]);
router.post('/remove/permit',[validateToken(),validateRole("Owner"),validateBody(UserSchema.addPermit),controller.removePermit]);

// router.route("/:id")
//     .get(validateParam(AllSchema.id, "id"), controller.get)
//     .patch(validateBody(UserSchema.add), controller.patch)
//     .delete(validateParam(AllSchema.id, "id"), controller.drop);

module.exports = router;
