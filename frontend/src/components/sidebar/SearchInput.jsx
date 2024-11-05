import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { fetchAllUsers } from "../../api/userService"; // Ensure this imports your fetchAllUsers function
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const [users, setUsers] = useState([]); // State to store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await fetchAllUsers(); // Fetch all users
        setUsers(allUsers); // Store all users in state
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = users.filter(user => 
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [search, users]);

  const handleUserClick = (user) => {
    const conversation = {
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
    };
    setSelectedConversation(conversation); 
    setSearch("");
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-bordered rounded-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      
      {/* Display filtered user results */}
      {filteredUsers.length > 0 && (
        <ul className="mt-2">
          {filteredUsers.map(user => (
            <li
              key={user._id}
              className='py-2 px-3 hover:bg-gray-200 cursor-pointer'
              onClick={() => handleUserClick(user)} 
            >
              {user.fullName} ({user.role}) {/* Display user role alongside name */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchInput;
