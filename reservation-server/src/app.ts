import 'dotenv/config'
import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./routes"
import { authMiddleware } from "./middlewares/auth"

const app: Express = express()
const PORT: string | number = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(authMiddleware)
app.use(router)

const uri: string = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/hilton`

console.log(`mongodb:${uri}`)

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () => 
            console.log(`Server runing on http://localhost:${PORT}`))
    )
    .catch(error => {
        console.log(error);
    })

process.on('uncaughtException', function(err) {
    console.log(err);
    //process.exit(1);
});     
