
const router = require('express').Router();
const controller = require('../controllers/permit');
const {PermitSchema, AllSchema}=require('../utils/schema');
const {validateBody,validateParam,validateToken} = require('../utils/validator');


// Add routes
router.post('/', [validateToken(),validateBody(PermitSchema.add),controller.add]);
router.get('/', controller.all);
// router.route("/:id")
//     .get(validateParam(AllSchema.id, "id"), controller.get)
//     .patch(validateParam(AllSchema.id), controller.patch)
//     .delete(validateParam(AllSchema.id, "id"), controller.drop);



module.exports = router;
