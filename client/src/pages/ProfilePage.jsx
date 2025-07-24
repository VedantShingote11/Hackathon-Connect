import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { getUser } from '../services/userOperations'
import { useUser } from '@clerk/clerk-react'

const ProfilePage = () => {
    const { user, isLoaded } = useUser();

    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        _id: "",
        name: "",
        username: "",
        email: "",
        skills: [],
        collegeName: "",
        achievements: [],
        linkedIn: "",
        github: "",
        instagram: "",
        highestQualification: "",
        profilePicture: ""
    });

    useEffect(() => {
        const getData = async () => {
            if (!user && !isLoaded) return;

            const email = user?.primaryEmailAddress?.emailAddress;

            const res = await getUser(email);

            if (res.success) {
                setUserData(res.data);
            }
        }

        getData();
    }, [isLoaded, user])




    return (
        <div className="min-h-[89vh] flex justify-center items-center bg-gradient-to-r from-blue-50 to-gray-100 p-6 overflow-hidden">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl flex border border-gray-300">

                <div className="w-1/3 p-6 flex flex-col items-center space-y-6 bg-white rounded-l-2xl border-r border-gray-300">
                    <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-blue-600">
                        <img
                            src={userData.profile_picture}
                            alt="Profile"
                            width={144}
                            height={144}
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                    <p className="text-md text-gray-600">@{userData.username}</p>
                    <p className="text-md text-gray-600">{userData.phone}</p>
                    <p className="text-md text-gray-600">{userData.email}</p>
                    <div className="flex space-x-4 mt-4">
                        <a href={userData.instagram} className="text-pink-500 text-2xl hover:scale-110 transition-transform">
                            <FaInstagram />
                        </a>
                        <a href={userData.linkedin} className="text-blue-600 text-2xl hover:scale-110 transition-transform">
                            <FaLinkedinIn />
                        </a>
                        <a href={userData.github} className="text-gray-800 text-2xl hover:scale-110 transition-transform">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <div className="w-2/3 p-6 space-y-6 bg-gray-50 rounded-r-2xl">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(userData?.skills || []).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg text-sm shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">College</h2>
                        <p className="text-gray-700 mt-2">{userData.college_name}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Highest Qualification</h2>
                        <p className="text-gray-700 mt-2">{userData.highest_qualification}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                            {(userData?.skills || []).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg text-sm shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() => setEditing(!editing)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        {editing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;