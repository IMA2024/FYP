const express = require("express");
const app = express();
var cors = require('cors')
const { signup, signin } = require("./controllers/profiling");
const userRouter = require("./routes/adminRoute");
const adminRouter = require("./routes/adminRoute");


require('dotenv').config()

const mongoose = require("mongoose");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
app.use(cors());
app.use(express.json());

app.use("/signup",signup);
app.use("/signin",signin);

app.use("/user",userRouter);
app.use("/admin",adminRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).then(() => {
    app.listen(5000, () => {
        console.log("Server is running.")
    })
})
    .catch((error) => {
        console.log(error);
    })
    

