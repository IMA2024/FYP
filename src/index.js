const express = require("express");
const app = express();
var cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config()
const { signup, signin, myProfile } = require("./controllers/profiling");
const adminRouter = require("./routes/adminRoute");
const businessOwnerRouter = require("./routes/businessOwnerRoute");
const marketingAgentRouter = require("./routes/marketingAgentRoute");
// const chatRouter = require("./routes/chatRoute");


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
app.use("/myProfile", myProfile);

app.use("/admin", adminRouter );
app.use("/businessOwner", businessOwnerRouter);
app.use("/marketingAgent", marketingAgentRouter);

// app.use("/chat", chatRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).then(() => {
    app.listen(80, () => {
        console.log("Server is running.")
    })
})
    .catch((error) => {
        console.log(error);
    })
    

