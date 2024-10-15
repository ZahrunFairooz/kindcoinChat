import User from "../models/user.model.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get users by role
export const getUsersByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await User.find({ role }); // Find users with the specified role
        res.status(200).json(users); // Return users (empty array if none found)
    } catch (error) {
        console.error("Error fetching users by role:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the logged-in user's role
export const getLoggedInUserRole = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure req.user is populated by authentication middleware
        const user = await User.findById(userId).select('role'); // Fetch user by ID and select only the role field

        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Return 404 if user is not found
        }

        res.status(200).json({ role: user.role }); // Send back the user's role
    } catch (error) {
        console.error("Error fetching logged-in user role:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
