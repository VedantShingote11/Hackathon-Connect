import React from 'react'
import { Link } from 'react-router-dom'
import Innovate from '../assets/Innovate.jpg'
import Collaborate from '../assets/Collaborate.jpg'
import Participate from '../assets/Participate.jpg'

const DashboardPage = () => {

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800 p-8 text-center">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        🚀 Build. Innovate. Connect.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Join global hackathons, form powerful teams, and transform your ideas into reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src={Participate}
                            alt="Participate"
                            width="300"
                            height="200"
                            className="rounded-xl mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-600">
                            Participate
                        </h2>
                        <p className="text-gray-500">
                            Join premium hackathons and present your innovative solutions.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src={Collaborate}
                            alt="Collaborate"
                            width="300"
                            height="200"
                            className="rounded-xl mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2 text-green-600">
                            Collaborate
                        </h2>
                        <p className="text-gray-500">
                            Connect with like-minded innovators and build powerful teams.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src={Innovate}
                            alt="Innovate"
                            width="300"
                            height="200"
                            className="rounded-xl mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2 text-orange-600">
                            Innovate
                        </h2>
                        <p className="text-gray-500">
                            Solve real-world problems by turning your ideas into reality.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link to={'/hackathons'} >
                        <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105">
                            Explore Hackathons
                        </div>
                    </Link>
                    <Link to={'/myTeams'} >
                        <div className='bg-green-500 text-gray-800 px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-gray-300 transition-transform transform hover:scale-105'>
                            👥 View Teams
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-[500px] text-center py-28 flex flex-col justify-center items-center border-b border-gray-300">
                <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
                    💡 Why Choose <span className="text-blue-600">HackConnect?</span>
                </h2>
                <p className="text-gray-500 max-w-3xl mx-auto text-lg mb-12">
                    HackConnect is designed to bridge the gap between brilliant innovators and real-world problem-solving.
                    We provide a collaborative platform where you can:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white transform hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                            🚀 Explore Opportunities
                        </h3>
                        <p className="text-gray-500">
                            Discover a wide range of hackathons and showcase your skills.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white transform hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-green-600">
                            🤝 Build Powerful Teams
                        </h3>
                        <p className="text-gray-500">
                            Connect with talented individuals and form impactful teams.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white transform hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-orange-600">
                            💻 Turn Ideas Into Reality
                        </h3>
                        <p className="text-gray-500">
                            Transform your innovative ideas into working solutions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage