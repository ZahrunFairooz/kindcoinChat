import axios from 'axios';

export const fetchUsersByRole = async (role) => {
  try {
    const response = await axios.get(`/api/users/${role}`);
    
    // Validate that the data is an array
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format returned from API');
    }
    
    return response.data; // Returns an array of users or empty array if none found
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error; // Rethrow for further handling if needed
  }
};

export const fetchLoggedInUserRole = async () => {
  try {
    const response = await axios.get(`/api/users/auth/loggedInUserRole`);

    // Ensure you're returning the role data here
    if (!response.data.role) {
      throw new Error('Role not found in the response');
    }

    return response.data.role;
  } catch (error) {
    console.error("Error fetching logged-in user role:", error);
    throw error; // Rethrow for further handling if needed
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; // Re-throw to handle in the calling component
  }
};
