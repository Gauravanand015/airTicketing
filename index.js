const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/user.route");
const { flightRouter } = require("./Routes/flight.route");
const { bookingRouter } = require("./Routes/booking.route");
const app = express();
require('dotenv').config()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOMEPAGE Air Booking")
})

app.use("/",userRouter)
app.use("/",flightRouter)
app.use("/",bookingRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected To DB")
        console.log("Connected to the server")   
    } catch (error) {
        console.log({"Message":"Error while making connection",err:error})
    }
})