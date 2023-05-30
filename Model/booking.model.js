const mongoose = require("mongoose");
const { UserModel } = require("./users.model");
const { FlightModel } = require("./flight.model");


const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: UserModel },
  flight: { type: mongoose.Schema.ObjectId, ref: FlightModel },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel
};
