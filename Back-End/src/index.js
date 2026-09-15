import express from "express"
import dotenv from "dotenv"
import databaseConnection from "./lib/db.js"
import dns from 'node:dns';
import {clerkMiddleware} from "@clerk/express"
import cors from "cors"
import fs from "fs"
import path from "path";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js"
import authRoutes from "./routes/auth.router.js"
import messageRoutes from "./routes/message.router.js"
import { app, server } from "./lib/socket.js";

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()
databaseConnection()


// Initializin port and FrontEnd Url
const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL



const publicDir = path.join(process.cwd(), "public")

// Don't parse the webhook event data , it should be in raw format

app.use("/api/webhooks/clerk", express.raw({type: "application/json"}), clerkWebhook)

app.use(express.json())
app.use(clerkMiddleware())
app.use(cors(
  {
    origin:FRONTEND_URL,
    credentials: true
  }
))

if(fs.existsSync(publicDir)){

    app.use(express.static(publicDir))

    app.get("/{*any}", (req,res,next) => {

        res.sendFile(path.join(publicDir,"index.html"), (err) => next(err))
    })
}

// health endpoint

app.get("/health", (req, res) => {
    res.status(200).json({ok : true})
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)



server.listen(PORT, () => {
    console.log("Server is Listening on port 3000");
    if(process.env.NODE_ENV=== "production") job.start;
})