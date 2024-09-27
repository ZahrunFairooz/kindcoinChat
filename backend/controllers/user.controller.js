import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error); // Improved logging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get users by role
export const getUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await User.find({ role });
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error("Error fetching users by role:", error); // Improved logging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
