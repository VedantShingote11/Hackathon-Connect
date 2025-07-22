import { React, useEffect, useState } from 'react';
import { search } from '../services/connectionOperation'
import { useUser } from '@clerk/clerk-react'
import { getUser } from '../services/userOperations'
import { invite } from '../services/connectionOperation'


const SearchPage = () => {

    const { user, isLoaded } = useUser();

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [currUser, setCurrUser] = useState()

    const searchQuery = async (query) => {
        if (query.length === 0) return;

        const res = await search(query);

        if (res.success) {
            if (!user && !isLoaded) return;
            const email = user.primaryEmailAddress?.emailAddress;
            const filteredData = res.data.filter(
                (user) => user.email !== email
            );
            setData(filteredData);
        }
    }

    const sendInvite = async (item) => {
        const send = async (item) => {

            const request = {
                senderId: currUser._id,
                receiverId: item._id,
                senderEmail: currUser.email,
                receiverEmail: item.email,
                isAccepted: false
            }
            const req = await invite(request);

            if (req.success) {
                alert("Invitation send");
            }
        }
        send(item);
    }

    useEffect(() => {
        const getUserData = async () => {

            if (!isLoaded && !user) return;
            const email = user?.primaryEmailAddress?.emailAddress;

            const data = await getUser(email);

            if (data.success) {
                setCurrUser(data.data);
            }
            else {
                console.log("Error while getting user");
            }
        }

        getUserData();
    }, [])

    return (
        <div className="bg-gray-100 min-h-[89vh] flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl space-y-6 border border-gray-200">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-4">User Search</h1>
                    <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="flex items-center gap-4 w-full p-4 border border-gray-300 rounded-xl shadow-sm bg-white">
                    <input
                        className="flex-1 rounded-lg border border-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Search by name..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={() => searchQuery(query)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                    >
                        Search
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 space-y-4">
                    {data.length === 0 ? (
                        <div className="text-center text-gray-600 text-lg">No data found</div>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="flex items-center justify-between gap-6 p-4 border-b border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-semibold text-gray-900">{item.username}</div>
                                    <div className="text-sm text-gray-600">{item.collegeName}</div>
                                </div>
                                <div className="flex flex-col gap-2 text-gray-700">
                                    <div className="text-sm">{item.email}</div>
                                    <div className="text-sm font-medium">{item.skills && item.skills.length > 0 ? item.skills.join(", ") : "No skills listed"}</div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition shadow-md">
                                        View Profile
                                    </button>

                                    <Link ></Link>
                                    <button onClick={() => sendInvite(item)} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition shadow-md">
                                        Invite
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage