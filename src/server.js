import express from "express";
import bodyParser from "body-parser";
import schoolRoutes from "./routes/schoolRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/schools", schoolRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the School API");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
