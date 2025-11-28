import {Request, Response} from "express"
import express from "express"
import userRoutes from "./users/user.routes"
import cors from "cors"
import connectDB from "../database/client"
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const Server = "/biblioteca"
console.log(Server + "/users")
app.use(Server + "/users" , userRoutes)

function routeNotFound (req: Request, res: Response) {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
}

app.use(routeNotFound);

try {
    connectDB(process.env.ConnectionString!);
} catch (err) {
    if (!process.env.ConnectionString) {
  throw new Error("Missing environment variable: ConnectionString");
}
}

app.listen(8000, () => {
    console.log("Server listening to port 8000.")
});