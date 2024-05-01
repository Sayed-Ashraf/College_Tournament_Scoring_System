const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController.js")
const adminController = require("../controllers/adminController.js");
const eventController = require("../controllers/eventController.js");
const authMiddleware = require("../middlewares/authMiddleware.js")


// User Routes
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/user/:id", authMiddleware, userController.getSingleUser);
router.put("/user/update/:id", authMiddleware, userController.updateUser);
router.delete("/user/delete/:id", authMiddleware, userController.deleteUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

// Admin Routes
router.get('/admins', authMiddleware, adminController.getAlladmins);
router.post('/admin/add', authMiddleware, adminController.addAdmin);
router.put('/admin/update/:id', authMiddleware, adminController.updateAdmin);
router.delete('/admin/delete/:id', authMiddleware, adminController.deleteAdmin);

// Event Routs
router.get('/events', authMiddleware, eventController.getAllEvents);
router.get('/event/:id', authMiddleware, eventController.getEventbyPK)
router.post('/events/add', authMiddleware, eventController.createEvent);
router.post('/events/:id/results', authMiddleware, eventController.calculateResults);

module.exports = router;