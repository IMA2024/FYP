const express = require("express");
const { addBusiness, viewBusiness, updateBusiness, deleteBusiness, viewSpecificBusiness} = require("../controllers/businessController");
const businessRouter = express.Router(); 

businessRouter.post('/addBusiness', addBusiness);
businessRouter.get('/viewBusiness', viewBusiness);
businessRouter.get('/viewSpecificBusiness/:email', viewSpecificBusiness);
businessRouter.patch('/updateBusiness/:id', updateBusiness);
businessRouter.delete('/deleteBusiness/:id', deleteBusiness);


module.exports = businessRouter;