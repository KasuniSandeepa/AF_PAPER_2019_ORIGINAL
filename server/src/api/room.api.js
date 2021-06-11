const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller");

module.exports = function(){
    router.get("/", controller.getAllRooms);
    router.post("/create", controller.createRoom);
    router.post("/calculate", controller.calculateTotalCost);

    return router;
}