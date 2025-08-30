const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const MONGO_URI=process.env.MONGO_URI || 'mongodb+srv://anik001:iamanik2003@cluster0.rxx2g9w.mongodb.net/PocketNotes?retryWrites=true&w=majority&appName=Cluster0';
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
