const express = require("express");
const { signup, signin, viewAllOwners, viewSpecificOwner, updateOwner, deleteOwner } = require("../controllers/businessOwnerController");
const businessOwnerRouter = express.Router();

businessOwnerRouter.post('/signup', signup);
businessOwnerRouter.post('/signin', signin);
businessOwnerRouter.get('/viewAllOwners', viewAllOwners);
businessOwnerRouter.get('/viewSpecificOwner/:id', viewSpecificOwner);
businessOwnerRouter.patch('/updateOwner/:id', updateOwner);
businessOwnerRouter.delete('/deleteOwner/:id', deleteOwner);

module.exports = businessOwnerRouter;