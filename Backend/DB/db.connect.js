const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const MONGO_URI=process.env.MONGO_URI || 'mongodb://localhost:27017/PocketNotes';
const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected successfully');
    }
    catch(err){
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports=connectDB;
