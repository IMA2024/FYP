const express = require("express");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness, viewSpecificBusiness} = require("../controllers/adminController/businessController");
const { businessOwnerAuth, adminAuth } = require("../middleware/auth");
const businessRouter = express.Router(); 

businessRouter.post('/addBusiness' , addBusiness);
businessRouter.get('/viewBusinesses', viewAllBusinesses);
businessRouter.get('/viewSpecificBusiness' ,viewSpecificBusiness);
businessRouter.put('/updateBusiness', updateBusiness);
businessRouter.delete('/deleteBusiness', deleteBusiness);

module.exports = businessRouter;