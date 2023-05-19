const express = require("express");
const { signup, signin, viewSpecificAdmin, updateAdmin, deleteAdmin } = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);
adminRouter.get('/viewSpecificAdmin/:id', viewSpecificAdmin);
adminRouter.patch('/updateAdmin/:id', updateAdmin);
adminRouter.delete('/deleteAdmin/:id', deleteAdmin);

module.exports = adminRouter;