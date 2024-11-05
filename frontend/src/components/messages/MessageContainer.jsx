import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useGetConversations from "../../hooks/useGetConversations";
import useSendMessage from "../../hooks/useSendMessage"; // Import the send message hook

const MessageContainer = () => {
	const { loading, conversations } = useGetConversations(); // Fetch conversations
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { sendMessage, loading: sendingLoading } = useSendMessage(); // Use sendMessage hook

	useEffect(() => {
		// Cleanup function to reset selected conversation on unmount
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	const handleSendMessage = async (formData) => {
		await sendMessage(formData);
		// You can handle any post-send actions here, like clearing inputs if needed
	};

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{loading ? (
				<p>Loading conversations...</p>
			) : !selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput onSubmit={handleSendMessage} loading={sendingLoading} /> {/* Pass the onSubmit function */}
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-white font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;
