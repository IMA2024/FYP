const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoute");
const marketingAgentRouter = require("./routes/marketingAgentRoute");
const businessOwnerRouter = require("./routes/businessOwnerRoute");
const businessRouter = require("./routes/businessRoute");
require('dotenv').config()

const mongoose = require("mongoose");

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/marketingAgent", marketingAgentRouter);
app.use("/businessOwner", businessOwnerRouter);
app.use("/business", businessRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log("Server is running.")
    })
})
    .catch((error) => {
        console.log(error);
    })

