const express = require("express");
const { FlightModel } = require("../Model/flight.model");
const { authenticate } = require("../middleware/authenticate");
const flightRouter = express.Router();

flightRouter.get("/flights", async (req, res) => {
  let flightsData = await FlightModel.find();
  res.status(200).send(flightsData);
});

flightRouter.get("/flights/:id", async (req, res) => {
  let flightId = req.params.id;
  let flightsData = await FlightModel.findOne({ _id: flightId });
  res.status(200).send(flightsData);
});

flightRouter.post("/flights",authenticate, async(req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;
  try {
    let flightData = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });

    await flightData.save();
    res.status(201).send("New Flight Added");
  } catch (error) {
    console.log(error);
    res.send("Error while registering the new flight");
  }
});

flightRouter.patch("/flights/:id",authenticate,async(req,res)=>{
    let flightId = req.params.id;
    let updatedData = req.body;

    try {
        let updatedFlight = await FlightModel.findByIdAndUpdate({_id:flightId},updatedData)
        res.status(204).send("Flight Data Updated")
    } catch (error) {
        console.log(error);
        res.send("Error while updating the route by id")
    }
})

flightRouter.delete("/flights/:id",authenticate,async(req,res)=>{
    let flightId = req.params.id;
    try {
        let updatedFlight = await FlightModel.findByIdAndRemove({_id:flightId})
        res.status(202).send("Flight Data Deleted")
    } catch (error) {
        console.log(error);
        res.send("Error while deleting the route by id")
    }
})



module.exports = {
  flightRouter,
};
