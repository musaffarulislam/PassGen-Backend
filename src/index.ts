import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./routers/userRouter";
import connectDb from "./config/database"

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT 
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS.split(',')

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(morgan("dev"));

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`The server start at running on port ${port}`);
});