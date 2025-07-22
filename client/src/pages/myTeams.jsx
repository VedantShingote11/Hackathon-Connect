import { useState, useEffect } from 'react'
import { deleteTeam, getTeams } from '../services/teamOperations'
import { Link } from 'react-router-dom'

const MyTeams = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const data = await getTeams();

            console.log(data)
            if (data.success) {
                setTeams(data.data);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await deleteTeam(id)
        if(res.success){
            setTeams(prevTeams => prevTeams.filter(team => team._id !== id));
        }
    }


    return (
        <div className="min-h-[89vh] bg-gray-200 flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">👥 Your Teams</h1>

            <div className="w-[85vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teams.length === 0 ? (
                    <div className="text-gray-500 text-lg">
                        No teams available. <span className="text-blue-600 font-semibold">Create a new team!</span>
                    </div>
                ) : (
                    teams.map((item, index) => (
                        <div key={index} className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-blue-600">{item.teamName}</h2>
                                <div onClick={() => handleDelete(item._id)} className="cursor-pointer text-red-500 hover:text-red-700 transform hover:scale-110 transition-all">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/skkahier.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "30px" }}
                                    ></lord-icon>
                                </div>
                            </div>

                            <div className="mt-4 text-gray-600 space-y-2">
                                <p><span className="font-semibold text-gray-800">💡 Team Leader:</span> {item.teamLeader.split('@')[0]}</p>
                            </div>

                            <div className="mt-4">
                                <Link to={'/chat'}>
                                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105">
                                        Chat
                                    </button>
                                </Link>
                            </div>

                            <Link to={'/teamDetails'}>
                                <div className="absolute bottom-4 right-4 cursor-pointer hover:scale-110 transition-transform duration-300">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/whtfgdfm.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "30px" }}
                                    ></lord-icon>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            <Link to={"/createTeam"}>
                <button className="mt-8 bg-green-500 text-white py-3 px-10 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg transform hover:scale-105">
                    ➕ Create Team
                </button>
            </Link>
        </div>
    )
}

export default MyTeams