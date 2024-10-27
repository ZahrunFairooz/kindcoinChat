import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation"; // Import your Zustand store

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const { setMessages } = useConversation(); // Get setMessages from Zustand store

	useEffect(() => {
		if (authUser) {
			const socket = io("http://127.0.0.1:3000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Listen for new messages
			socket.on("newMessage", (message) => {
				setMessages((prevMessages) => [...prevMessages, message]); // Update messages in Zustand store
			});

			return () => {
				socket.off("getOnlineUsers"); // Clean up listener
				socket.off("newMessage"); // Clean up listener
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser, setMessages]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
