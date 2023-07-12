const express = require("express");
const { signup, signin, viewAllOwners, viewSpecificOwner, updateOwner, deleteOwner, changePassword } = require("../controllers/businessOwnerController");
const { businessOwnerAuth, adminAuth } = require("../middleware/auth");
const businessOwnerRouter = express.Router();

businessOwnerRouter.post('/signup', signup);
businessOwnerRouter.post('/signin', signin);
businessOwnerRouter.get('/viewAllOwners', adminAuth, viewAllOwners);
businessOwnerRouter.get('/viewSpecificOwner/:id',businessOwnerAuth, viewSpecificOwner);
businessOwnerRouter.patch('/changePassword',businessOwnerAuth, changePassword);
businessOwnerRouter.patch('/updateOwner/:id',businessOwnerAuth, updateOwner);
businessOwnerRouter.delete('/deleteOwner/:id', businessOwnerAuth, deleteOwner);

module.exports = businessOwnerRouter;