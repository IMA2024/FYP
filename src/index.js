const express = require("express");
const app = express();
const adminRouter = require("./routes/adminRoute");
const marketingAgentRouter = require("./routes/marketingAgentRoute");
const businessOwnerRouter = require("./routes/businessOwnerRoute");
const businessRouter = require("./routes/businessRoute");
const subscriptionRouter = require("./routes/subscriptionRoute");
const businessQuestionnaireRouter = require("./routes/businessQuestionnaire");
const revenueRouter = require("./routes/revenueRoute");
const expenseRouter = require("./routes/expenseRoute");

require('dotenv').config()

const mongoose = require("mongoose");


app.use(express.json());
app.use("/admin", adminRouter);
app.use("/marketingAgent", marketingAgentRouter);
app.use("/businessOwner", businessOwnerRouter);
app.use("/business", businessRouter);
app.use("/subscription", subscriptionRouter);
app.use("/businessQuestionnaire", businessQuestionnaireRouter);
app.use("/revenue", revenueRouter);
app.use("/expense", expenseRouter);

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

