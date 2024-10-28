import { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null); // State to track the selected user

  const startConversation = (user) => {
    setCurrentUser(user); // Update the state with the selected user
  };

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar onUserSelect={startConversation} /> {/* Pass the function to Sidebar */}
      <MessageContainer currentUser={currentUser} /> {/* Pass the selected user to MessageContainer */}
    </div>
  );
};

export default Home;
