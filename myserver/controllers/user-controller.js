const Users = require("../model/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("express");

// get All Users
// const get_All_Users= async (req,res)=>{

//     try {
//        const users=await Users.find();
//        res.json(users)
//     } catch (error) {
//         res.json({message:error})
//     }
// }
const login = async (req, res) => {
console.log("Login called")
  let message = "Login Success";
  const data = req.body;
  try {
    let user = await Users.findOne({ email: data.email });
    console.log("--loginUser",user)
    const newPassword = await bcrypt.compare(data.password, user.password);
    console.log(user)
    if (user && newPassword) {
      console.log("user present")
      user = {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profession: user.profession,
      };
      jwt.sign(
        { user },
        (jwtKey = "jwt"),
        { expiresIn: "300" },
        (err, token) => {
          res.status(201).json({
            message,
            status: "success",
            token,
          });
        }
      );
    } else if (!user || !newPassword) {
      res.status(200).json({status:200, message: "Wrong Credentials" });
    }
  } catch (error) {
    if (
      error.message === "Cannot read properties of null (reading 'password')"
    ) {
      res.status(200).json({status:200, message: "User not found" });
    }
  }
};

const register = async (req, res) => {
  console.log("register Api Called");
  try {
    const data = req.body;
    let message = "User already exists";
    // check if user already exists
    let user = await Users.findOne({ email:data.email });
    if (user) {
      user = {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        profession: user.profession,
      };
      return res.status(200).json({
        message,
        status: "error",
        user,
      });
    }

    if (!user) {
      user = await Users.create(data);
      message = "User created successfully";
    }
    console.log("register",user)
    user = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      profession: user.profession,
    };
    jwt.sign({ user }, (jwtKey = "jwt"), { expiresIn: "300" }, (err, token) => {
      res.status(201).json({
        message,
        status: "success",
        user,
        token,
      });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const get_Single_Users=async(req,res)=>{
  const token=req.body.payload
  const userdata=await jwt.decode(token);
  console.log("----",userdata)
  let user = await Users.findOne({email:userdata.user.email}).select("+profession");
  console.log("---------user",user)
res.json({user, status:"success",})
}

const update_Single_Users=async(req,res)=>{
  const data={
    email:req.body.email,
    name:req.body.name,
    mobile:req.body.mobile,
    profession:req.body.profession
  }
  console.log(req.params.userId)
    let updatedUser = await Users.findByIdAndUpdate(req.params.userId,data);
    let savedUser = await Users.findOne({ _id:req.params.userId });
    console.log(savedUser)
   if(savedUser){
      res.status(201).json({
        status: "success",
        user:savedUser,
      });
    
   }
   else{
    res.status(201).json({
      status: "Error",
    });
   }
  }
// // single Users
// const get_Singe_Users= async (req,res)=>{
//     let message="User Not Found";
//     try {
//         const users=await Users.findById(req.body.email);
//        if(users){
//         res.json({users,message})
//        }
//        else{
//         res.json(message)
//        }
//        res.json(users)
//      } catch (error) {
//          res.json({message:error})
//      }
// }

// // New Product
// const post_New_Users= async (req,res)=>{
//     let payload={
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         mobile:req.body.mobile,
//         profession:req.body.profession
//     }
//     let checkUsers= async()=>{
//         try {
//             const users=await Users.findById(req.body.email);
//            if(users){
//             res.json({users,message})
//            }
//            else{
//             res.json(message)
//            }
//            res.json(users)
//          } catch (error) {
//              res.json({message:error})
//          }
//     }

//     const newUser= new Users({
//         name:req.body.name,
//         password:req.body.password
//     })
//     try {
//         const savedUsers=await Users.create(newUser);
//         res.json(savedUsers)
//      } catch (error) {
//          res.json({message:error})
//      }
// }

// // update Users
// const update_Single_Users= async (req,res)=>{}

// // delete Users
// const delete_Single_Users= async (req,res)=>{


// }

module.exports = {
  login,
  register,
  // get_All_Users,
  get_Single_Users,
  // post_New_Users,
  update_Single_Users,
  // delete_Single_Users
};
