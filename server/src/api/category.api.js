const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

module.exports = function(){
    router.get("/", controller.getAllCategories);
    router.get("/:id", controller.getRoomsForCategory);
    router.post("/create", controller.createCategory);
    return router;
}