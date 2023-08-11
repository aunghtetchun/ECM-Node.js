const router = require("express").Router();
const controller = require("../controllers/delivery");
const { saveSingleFile } = require("../utils/gallery");
// Add routes
router.post("/",saveSingleFile,  controller.add);
router.get("/",  controller.all);
router.route('/:id')
    .get(controller.get)
    .delete(controller.drop)
    .patch([saveSingleFile,controller.patch])

module.exports = router; 
