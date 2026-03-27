import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  REGISTER
export const register = async(req,res)=>{
try{

const {username,email,password}=req.body;

if(!username || !email || !password){
return res.status(400).json("All fields required");
}

//  lowercase email 
const existing = await User.findOne({email: email.toLowerCase()});

if(existing){
return res.status(400).json("User already exists");
}

const hash = await bcrypt.hash(password,10);

const user = await User.create({
username,
email: email.toLowerCase(),
password: hash
});

res.status(201).json({
message:"User registered successfully"
});

}catch(err){
res.status(500).json(err.message);
}
};

//  LOGIN ✅ FIXED
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json("User not found")
    }

    // ✅ FIX: bcrypt compare
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json("Wrong password")
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      user,
      token
    })

  } catch (err) {
    res.status(500).json(err.message)
  }
}