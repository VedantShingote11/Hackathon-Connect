// import { useUser } from '@clerk/clerk-react'
// import { getUser } from '../services/userOperations'
// import { useParams } from 'react-router-dom';
// import { getTeam } from '../services/teamOperations'
// import { getMessage, sendMessage } from '../services/messageOperation'
// import { useRef, useState, useEffect } from 'react';

// const ChatPage = () => {

//     const { chatId } = useParams();
//     const { user, isLoaded } = useUser();

//     const [group, setGroup] = useState('')
//     const [currUser, setCurrUser] = useState('')
//     const [newMessage, setNewMessage] = useState("")
//     const [messages, setMessages] = useState([])

//     const getUserData = async () => {
//         if (!user && !isLoaded) return;

//         const email = user?.primaryEmailAddress?.emailAddress;
//         const data = await getUser(email);

//         if (data.success) {
//             setCurrUser(data.data[0]);
//         }
//     }

//     const getTeamDetails = async () => {
//         const data = await getTeam(chatId);

//         if (data.success) {
//             setGroup(data.data);
//         }
//     }

//     const getMessages = async () => {
//         const data = await getMessage(chatId);

//         if (data.success) {
//             setMessages(data.data);
//         }
//     }

//     const handleChange = (e) => {
//         setNewMessage(e.target.value);
//     }


//     useEffect(() => {
//         getUserData();
//     }, [user, isLoaded])

//     useEffect(() => {
//         getTeamDetails()
//         getMessages()
//     }, [])

//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);


//     const onSend = async (e) => {
//         e.preventDefault();

//         const rec = group.teamIds
//             .filter(ids => ids !== currUser._id)

//             const new_Message = {
//                 sender: currUser._id,
//                 content: newMessage,
//                 chatId: chatId,
//                 receivers: rec
//             };

//         const message = await sendMessage(new_Message);

//         if (message.success) {
//             alert("Message send");
//             setNewMessage('');
//         }
//     }

//     useEffect(() => {

//     }, [])





//     return (
//         <div className="flex-1 flex flex-col h-[85vh]">

//             <div className="p-4 border-b flex justify-start items-center">
//                 <div className="flex items-center gap-2">
//                     <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//                         {group?.teamName?.charAt(0).toUpperCase()}
//                     </div>
//                     <p className="font-semibold">{group?.teamName}</p>
//                 </div>
//             </div>

//             <div className="flex-1 bg-white p-4 overflow-y-auto">
//                 {messages.length > 0 ? messages.map((msg, idx) => (
//                     <div
//                         key={idx}
//                         className={`flex flex-col mb-3 ${msg.sender === currUser._id ? 'items-end' : 'items-start'}`}
//                     >
//                         <div className="text-xs text-gray-500 mb-1">
//                             {msg.sender === currUser._id
//                                 ? "You"
//                                 : (group.teamIds?.indexOf(msg.sender) !== -1
//                                     ? group.teamEmails[group.teamIds.indexOf(msg.sender)].split('@')[0]
//                                     : "Unknown")}
//                         </div>
//                         <div
//                             className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === currUser._id
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-200 text-black'
//                                 }`}
//                         >
//                             {msg.content}
//                         </div>
//                     </div>
//                 )) : (
//                     <div>No chat available</div>
//                 )}
//                 <div ref={messagesEndRef}></div>
//             </div>

//             <div className="p-4 border-t flex items-center gap-2">
//                 <input
//                     onChange={handleChange}
//                     value={newMessage}
//                     name="newMessage"
//                     type="text"
//                     placeholder="Type a message..."
//                     className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <button onClick={onSend} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                     ➤
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ChatPage


import { useUser } from '@clerk/clerk-react'
import { getUser } from '../services/userOperations'
import { useParams } from 'react-router-dom';
import { getTeam } from '../services/teamOperations'
import { getMessage, sendMessage } from '../services/messageOperation'
import { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    autoConnect: false
});

const ChatPage = () => {
    const { chatId } = useParams();
    const { user, isLoaded } = useUser();

    const [group, setGroup] = useState('')
    const [currUser, setCurrUser] = useState('')
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getUserData = async () => {
        if (!user && !isLoaded) return;

        const email = user?.primaryEmailAddress?.emailAddress;
        const data = await getUser(email);

        if (data.success) {
            setCurrUser(data.data[0]);
        }
    }

    const getTeamDetails = async () => {
        const data = await getTeam(chatId);

        if (data.success) {
            setGroup(data.data);
        }
    }

    const getMessages = async () => {
        const data = await getMessage(chatId);

        if (data.success) {
            setMessages(data.data);
        }
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);

            // Join the chat room once connected
            if (chatId) {
                socket.emit('join-chat', chatId);
            }
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onReceiveMessage(message) {
            // Only add if not already in messages (avoid duplicates)
            setMessages(previous => {
                const exists = previous.some(msg =>
                    msg._id === message._id ||
                    (msg.sender === message.sender &&
                        msg.content === message.content &&
                        Math.abs(new Date(msg.timestamp) - new Date(message.timestamp)) < 1000)
                );
                if (exists) return previous;
                return [...previous, message];
            });
        }

        function onMessageHistory(messageHistory) {
            setMessages(messageHistory);
        }

        function onConnectError(error) {
            console.error('Connection error:', error);
        }

        // Connect to socket
        socket.connect();

        // Set up event listeners
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('receive-message', onReceiveMessage);
        socket.on('message-history', onMessageHistory);
        socket.on('connect_error', onConnectError);

        // Cleanup function
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('receive-message', onReceiveMessage);
            socket.off('message-history', onMessageHistory);
            socket.off('connect_error', onConnectError);

            // Leave the chat room
            if (chatId) {
                socket.emit('leave-chat', chatId);
            }

            socket.disconnect();
        };
    }, [chatId]);

    useEffect(() => {
        getUserData();
    }, [user, isLoaded])

    useEffect(() => {
        getTeamDetails()
        if (!isConnected) {
            getMessages()
        }
    }, [isConnected])

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const onSend = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !currUser._id) return;

        setIsLoading(true);

        const rec = group.teamIds?.filter(ids => ids !== currUser._id) || [];

        const new_Message = {
            sender: currUser._id,
            content: newMessage.trim(),
            chatId: chatId,
            receivers: rec,
            timestamp: new Date().toISOString(),
            senderName: currUser.name || user?.primaryEmailAddress?.emailAddress
        };

        try {
            if (isConnected) {
                socket.timeout(5000).emit('send-message', new_Message, (error) => {
                    setIsLoading(false);
                    if (error) {
                        console.error('Socket message failed:', error);
                        sendMessageHTTP(new_Message);
                    }
                });

                setNewMessage('');
            } else {
                await sendMessageHTTP(new_Message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setIsLoading(false);
        }
    }

    const sendMessageHTTP = async (messageData) => {
        try {
            const message = await sendMessage(messageData);

            if (message.success) {
                setNewMessage('');
            } else {
                alert("Failed to send message");
            }
        } catch (error) {
            console.error('HTTP message failed:', error);
            alert("Failed to send message");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex-1 flex flex-col h-[85vh]">
            <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                        {group?.teamName?.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-semibold">{group?.teamName}</p>
                </div>

                {/* //Status of user */}
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                        {isConnected ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>

            <div className="flex-1 bg-white p-4 overflow-y-auto">
                {messages.length > 0 ? messages.map((msg, idx) => (
                    <div
                        key={msg._id || idx}
                        className={`flex flex-col mb-3 ${msg.sender === currUser._id ? 'items-end' : 'items-start'}`}
                    >
                        <div className="text-xs text-gray-500 mb-1">
                            {msg.sender === currUser._id
                                ? "You"
                                : (group.teamIds?.indexOf(msg.sender) !== -1
                                    ? group.teamEmails[group.teamIds.indexOf(msg.sender)].split('@')[0]
                                    : msg.senderName || "Unknown")}
                        </div>
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === currUser._id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-black'
                                }`}
                        >
                            {msg.content}
                        </div>
                        {(msg.timestamp || msg.createdAt) && (
                            <div className="text-xs text-gray-400 mt-1">
                                {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="text-center text-gray-500 mt-8">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="p-4 border-t flex items-center gap-2">
                <input
                    onChange={handleChange}
                    value={newMessage}
                    name="newMessage"
                    type="text"
                    placeholder={isConnected ? "Type a message..." : "Connecting... Please wait"}
                    disabled={isLoading || !currUser._id}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                    onClick={onSend}
                    disabled={!newMessage.trim() || isLoading || !currUser._id}
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "➤"
                    )}
                </button>
            </div>
        </div>
    )
}

export default ChatPage