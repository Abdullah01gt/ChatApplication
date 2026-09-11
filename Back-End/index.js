import express from "express"
import dotenv from "dotenv"
import databaseConnection from "./db.js"
import dns from 'node:dns';
import {clerkMiddleware} from "@clerk/express"
import cors from "cors"

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()
databaseConnection()



const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL
const app = express()

app.use(express.json())
app.use(clerkMiddleware())
app.use(cors(
  {
    origin:FRONTEND_URL,
    credentials: true
  }
))

// health endpoint

app.get("/health", (req, res) => {
    res.status(200).json({ok : true})
})




app.listen(PORT, () => {
    console.log("Server is Listening on port 3000")
})