import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { fetchUsersByRole, fetchLoggedInUserRole } from "../../api/userService.js";
import useConversation from "../../zustand/useConversation";

const Sidebar = () => {
  const { setSelectedConversation } = useConversation();
  const [selectedRole, setSelectedRole] = useState("Select User");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await fetchLoggedInUserRole();
        setLoggedInUserRole(role);
      } catch (error) {
        console.error("Error fetching logged-in user role:", error);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (loggedInUserRole) {
      fetchUsers(); // Fetch users based on the logged-in user role
    }
  }, [loggedInUserRole]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let allowedRoles = [];

      // Determine allowed roles based on logged-in user's role
      if (loggedInUserRole === "donator") {
        allowedRoles = ['recipient', 'crew_member'];
      } else if (loggedInUserRole === "recipient") {
        allowedRoles = ['donator', 'crew_member'];
      } else if (loggedInUserRole === "crew_member" || loggedInUserRole === "admin") {
        allowedRoles = ['recipient', 'donator', 'crew_member', 'admin'];
      }

      // Fetch users for all allowed roles at once
      const usersData = await Promise.all(
        allowedRoles.map(role => fetchUsersByRole(role))
      );

      const allUsers = usersData.flat(); // Flatten the array of users
      setUsers(allUsers); // Update the state with the combined users

      // Set the selected role to the first allowed role if it's not already set
      if (!selectedRole) {
        setSelectedRole(allowedRoles[0]);
      }
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleClick = async (role) => {
    setSelectedRole(role);
    // Fetch users based on the selected role only
    try {
      const usersByRole = await fetchUsersByRole(role);
      setUsers(usersByRole); // Update the users state with the selected role users
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user) => {
    const conversation = {
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };
    setSelectedConversation(conversation);
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col text-white'>
      <SearchInput onSearch={setUsers} />
      <div className='divider px-3'></div>

      {/* Role Buttons */}
      <div className='flex justify-around mb-4'>
        {['recipient', 'donator', 'crew_member', 'admin'].map((role) => (
          <button
            key={role}
            className={`btn ${selectedRole === role ? 'btn-active' : ''}`}
            onClick={() => handleRoleClick(role)}
            disabled={
              (loggedInUserRole === "recipient" && (role === "recipient")) ||
              (loggedInUserRole === "donator" && (role === "donator")) 
            }
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}s
          </button>
        ))}
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className='text-center'>Loading users...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}

      {/* User List */}
      <div>
        <h3 className='text-center font-semibold text-lg'>
          {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s
        </h3>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className='py-2 px-3 hover:bg-gray-20 cursor-pointer'
                onClick={() => handleUserClick(user)}
              >
                {user.fullName}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-500'>No users found.</p>
        )}
      </div>

      <div className='mt-auto'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
