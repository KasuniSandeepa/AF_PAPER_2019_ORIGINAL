const mongoose = require("mongoose");
const Room = require('../models/room.model');
const Category = require('../models/category.model');

const createRoom = async (req,res) => {
    if(req.body){
        const room = new Room(req.body);
        await room.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
        console.log(req.body.selectedCategories);
    }
}

const getAllRooms= async (req,res) => {
    await Room.find({}).populate('categories','name description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
            console.log("kasuni");
        })
}


const calculateTotalCost = async (req,res) => {
    let totalAmount = 0;
   if(req.body){
      console.log(req.body);
      if(req.body.selectedRooms.length > 0){
          req.body.selectedRooms.map(roomAmount => {
              totalAmount += roomAmount;
          })
      }
      console.log(totalAmount);
   }
    res.status(200).send({ totalAmount: totalAmount });
}



module.exports = {
    createRoom,
    getAllRooms,
    calculateTotalCost

}