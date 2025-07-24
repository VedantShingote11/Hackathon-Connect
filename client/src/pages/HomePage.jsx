import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const HomePage = () => {

    return (
        <div className="h-full">
            <nav className="flex justify-between items-center px-8 py-4 bg-gray-100 border-b border-gray-300">
                <div>
                    <Link to="/" className="no-underline font-bold text-2xl text-black">
                        Hack-Connect
                    </Link>
                </div>
                <div>
                    <SignedOut>
                        <Link to="/sign-in">
                            <button className="mr-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/sign-up">
                            <button className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition">
                                Sign Up
                            </button>
                        </Link>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>

            <div className="flex flex-col justify-center items-center text-center px-4 py-8 min-h-[65vh]">
                <h1 className="text-3xl font-semibold">Welcome to Hack-Connect</h1>
                <p className="max-w-xl mt-4 text-lg text-gray-600">
                    Connect, collaborate, and conquer hackathons with like-minded developers from your college.
                </p>

                <SignedOut>
                    <p className="mt-8 text-base text-gray-500">
                        You are signed out. Please sign in to get started.
                    </p>
                </SignedOut>
            </div>

            <SignedIn>
                <div className="flex justify-center pb-12">
                    <Link to="/dashboard">
                        <button className="cursor-pointer px-8 py-4 bg-purple-700 text-white rounded-lg text-lg shadow-md hover:bg-purple-800 transition">
                            Get Started
                        </button>
                    </Link>
                </div>
            </SignedIn>
        </div>

    )
}

export default HomePage