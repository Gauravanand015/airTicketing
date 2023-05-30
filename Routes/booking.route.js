const express = require("express");
const { BookingModel } = require("../Model/booking.model");
const bookingRouter = express.Router();

bookingRouter.get("/dashboard", async (req, res) => {
  let data = await BookingModel.find().populate("user").populate("flight").exec();
  res.status(200).send(data);
});

bookingRouter.post("/booking", async (req, res) => {
  let bookingDetails = {
    user: req.body.user_data,
    flight: req.body.flight_data,
  };
  try {
    let data = new BookingModel(bookingDetails)
    await data.save()
    res.status(201).send("Flight booked")
  } catch (error) {
    console.log(error)
    res.send("Error while booking the flight")
  }
  
});

module.exports = {
  bookingRouter
};
