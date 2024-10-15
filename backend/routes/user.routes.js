import express from "express";
import { getAllUsers, getUsersByRole, getLoggedInUserRole } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
    const { fullName, username, password, gender, role } = req.body;
    try {
        const newUser = new User({ fullName, username, password, gender, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Other user routes
router.get('/auth/loggedInUserRole', protectRoute, getLoggedInUserRole); 
router.get('/:role', getUsersByRole);
router.get('/', getAllUsers); // Optional: Get all users

export default router;
