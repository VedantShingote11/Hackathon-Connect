import React from 'react'
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from "react-icons/ai";


const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
                <Link to={'/'}>
                    <span className="text-2xl font-extrabold text-gray-800 cursor-pointer">
                        Hack-Connect
                    </span>
                </Link>

                <div className="flex items-center space-x-6">

                    <Link to={'/search'}>
                        <button>
                            <lord-icon
                                src="https://cdn.lordicon.com/fkdzyfle.json"
                                trigger="hover"
                                style={{ width: "29px", height: "29px" }}>
                            </lord-icon>
                        </button>
                    </Link>

                    <Link to={"/hackathons"}>
                        <span className="text-gray-600 text-lg font-medium transition hover:text-blue-600 cursor-pointer">
                            🏆 Hackathons
                        </span>
                    </Link>
                    <Link to={"/myTeams"}>
                        <span className="text-gray-600 text-lg font-medium transition hover:text-blue-600 cursor-pointer">
                            👥 View Team
                        </span>
                    </Link>
                    <Link to={"/profile"}>
                        <span className="text-gray-600 text-lg font-medium transition hover:text-blue-600 cursor-pointer">
                            🔍 Profile
                        </span>
                    </Link>

                    <Link>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-lg font-medium shadow-md transition transform hover:bg-blue-500 hover:scale-105">
                            <AiOutlinePlusCircle className="text-xl" />
                            Host Hackathon
                        </button></Link>

                    <UserButton />
                </div>
            </div>
        </nav>
    );
}

export default NavBar