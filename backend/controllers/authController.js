const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
  const {email,password} = req.body;

  let user = await User.findOne({email});
  if(user) return res.status(400).json({msg:"User exists"});

  const hash = await bcrypt.hash(password,10);
  user = await User.create({email,password:hash});

  res.json({msg:"Registered"});
};

exports.login = async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:"Invalid credentials"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({msg:"Invalid credentials"});

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

  res.json({token});
};
