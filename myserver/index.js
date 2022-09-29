const express = require("express");
const users= require("./routes/users");
const cors = require("cors")

const app = express();
const mongoose = require("mongoose");
const db= require("./properties").DB_URL
mongoose.connect(db);
mongoose.connection.on("connected",()=>{
    console.log("db connected");
})
const userRoutes=require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes)

app.listen(4000,()=>{console.log("listening on 4000")});