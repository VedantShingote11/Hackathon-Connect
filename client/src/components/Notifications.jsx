import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getNotifications ,accept} from '../services/connectionOperation'

const Notifications = () => {

    const { user, isLoaded } = useUser();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const get = async () => {
            if (!isLoaded && !user) return;
            const email = user?.primaryEmailAddress?.emailAddress;
            const data = await getNotifications(email);

            console.log(data.data);
            if (data.success) {
                setNotifications(data.data);
            }
        }

        get();
    }, [user, isLoaded])

    const acceptInvitation = async (id) => {
        const data = await accept(id)
        console.log(data)
        if(data.success){
            setNotifications(
                (prev) =>
                prev.map((notif) =>
                    notif._id === id ? { ...notif, status: 'Accepted' } : notif
                )
            )
        }
    }

    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

    return (
        <div className="p-2 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold mb-3 border-b pb-2">Notifications</h2>

            {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No notifications found.</p>
            ) : (
                <ul className="space-y-3">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className="border border-gray-200 p-3 rounded-lg shadow-sm bg-gray-50"
                        >
                            <div className="mb-2">
                                <p className="text-sm"><strong>From:</strong> {notification.senderEmail}</p>
                                <p className="text-sm"><strong>To:</strong> {notification.receiverEmail}</p>
                                <p className="text-sm text-gray-600">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                {notification.receiverEmail === currentUserEmail ? (
                                    <button onClick={()=>acceptInvitation(notification._id)} className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
                                        {notification.status === "Send"?"Accept":notification.status}
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-white text-sm px-3 py-1 rounded cursor-not-allowed"
                                    >
                                        Requested
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notifications
