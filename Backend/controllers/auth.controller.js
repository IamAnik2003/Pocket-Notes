const User = require('../DB/User.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const setUser = async (req, res) => {
    console.log("server hited")
    const {firstName, lastName, email, password} = req.body;

    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })

        await newUser.save();

        res.status(201).json({message:'User created successfully'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }

}

const getUser=async (req,res)=>{
    
    const {email,password}=req.body;
    try{
        const loggedUser=await User.findOne({email});
        if(!loggedUser){
            return res.status(400).json({message:'User not found'});
        }
        const isPasswordValid= await bcrypt.compare(password,loggedUser.password);
        if (!isPasswordValid){
            return res.status(400).json({message:'Invalid Username or Password'});
        }
        const payload={
            id:loggedUser._id,
            email:loggedUser.email,
            firstName:loggedUser.firstName,
            lastName:loggedUser.lastName
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:'User logged in successfully',token, user: payload});
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Something went wrong, please try again'});
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search? {
        $or:[
            {name:{$regex:req.query.search,$options:'i'}},
            {email:{$regex:req.query.search,$options:'i'}}
        ],
    }
    : {};
console.log(keyword);

    try {
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports={getHello,setUser,getUser,allUsers};