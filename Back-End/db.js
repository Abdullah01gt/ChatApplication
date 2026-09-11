import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


export default async function databaseConnection(){
    
    try{
        
        const MONGODB_URI = process.env.MONGODB_URI
        if(!MONGODB_URI){
            throw new Error("MONGODB_URI required!")
        }
        const connection = await mongoose.connect(MONGODB_URI)
        console.log("Connected to database Successfully")

    }catch(error){

        console.log("MongoDb Connection Error: " , error.message)
        process.exit(1)
    }
}