const router = require("express").Router();
const controller = require("../controllers/role");
const { PermitSchema, AllSchema,RoleSchema } = require("../utils/schema");
const { validateBody, validateParam } = require("../utils/validator");

// Add routes
router.post("/", [validateBody(PermitSchema.add), controller.add]);
router.post("/add/permit", [validateBody(RoleSchema.addPermit), controller.roleAddPermit]);
router.post("/remove/permit", [validateBody(RoleSchema.addPermit), controller.roleRemovePermit]);
router.get("/", controller.all);
router.route("/:id")
    .get(validateParam(AllSchema.id, "id"), controller.get)
    .patch(validateBody(PermitSchema.add), controller.patch)
    .delete(validateParam(AllSchema.id, "id"), controller.drop);

module.exports = router;
