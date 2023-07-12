const express = require("express");
const { addBusiness, viewAllBusinesses, updateBusiness, deleteBusiness, viewSpecificBusiness} = require("../controllers/businessController");
const { businessOwnerAuth, adminAuth } = require("../middleware/auth");
const businessRouter = express.Router(); 

businessRouter.post('/addBusiness' ,businessOwnerAuth, addBusiness);
businessRouter.get('/viewBusinesses', businessOwnerAuth, viewAllBusinesses);
businessRouter.get('/viewSpecificBusiness/:id', businessOwnerAuth ,viewSpecificBusiness);
businessRouter.patch('/updateBusiness/:id', businessOwnerAuth, updateBusiness);
businessRouter.delete('/deleteBusiness/:id', businessOwnerAuth, deleteBusiness);

module.exports = businessRouter;