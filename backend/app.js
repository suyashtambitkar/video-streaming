const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const registerLogin = require("./Routes/Auth");
const Video = require("./Routes/Videos");


dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then((x)=>{
    console.log("Database Connected");
}).catch((err)=>{
   console.log("Error While Connecting to Database");
});

app.get("/",(req,res)=>{
    res.send("server is running1");
});

app.use("/auth",registerLogin);
app.use("/video",Video);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`server is runinng on port ${PORT}`);
});