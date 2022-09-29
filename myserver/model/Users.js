const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const usersSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    mobile:Number,
    profession:String
}, {
    versionKey: false,
    timestamps: true,
});

usersSchema.pre("save", async function (next) {
   try {
    const salt=await bcrypt.genSalt(8);
    const hashPassword=await bcrypt.hash(this.password, salt)
    this.password=hashPassword
    next()
   } catch (error) {
    next(error);
   }
    
  });
  
module.exports=mongoose.model("Users",usersSchema)