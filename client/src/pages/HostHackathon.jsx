import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { createEvent } from '../services/eventOperations'
import {useNavigate} from 'react-router-dom'

const HostHackathon = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        imgUrl: "",
        heading: "",
        description: "",
        lastDate: "",
        fee: "",
        prizePool: "",
        venue: "",
        mode: "",
        registrationLink: "",
        hostId: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user && !isLoaded)return

        const email = user?.primaryEmailAddress?.emailAddress;
        
        const eventDetails = {
            ...formData,
            hostId:email
        }

        const res = await createEvent(eventDetails);
        if (res.success) {
            alert('Event created');

            setFormData({
                imgUrl: "",
                heading: "",
                description: "",
                lastDate: "",
                prizePool: "",
                venue: "",
                fee: "",
                mode: "",
                registrationLink: "",
                hostId:""
            });

            navigate('/hackathons')
        }
    }


    return (
        <div className="w-full bg-gray-200 text-white py-8">

            <div className="mt-12 bg-white p-6 px-10 rounded-xl mx-6 md:mx-auto md:w-2/3">

                <h3 className="text-3xl font-bold text-center mb-4 text-slate-800">🚀 Host a Hackathon</h3>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="imgUrl"
                        value={formData.imgUrl}
                        onChange={handleChange}
                        placeholder="Hackathon Image URL"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />

                    <input
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                        placeholder="Hackathon Name"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Hackathon Description"
                        rows="3"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />

                    <input
                        type="date"
                        name="lastDate"
                        value={formData.lastDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />


                    <input
                        type="text"
                        name="prizePool"
                        value={formData.prizePool}
                        onChange={handleChange}
                        placeholder="Prize Pool (e.g. $1000)"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />


                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="Venue"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />


                    <input
                        type="text"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        placeholder="Fee (e.g. $100)"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />


                    <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    >
                        <option value="" disabled>
                            Select Mode
                        </option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <input
                        type="text"
                        name="registrationLink"
                        value={formData.registrationLink}
                        onChange={handleChange}
                        placeholder="Registration Link"
                        className="w-full p-3 rounded-md bg-gray-200 text-slate-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-400 transition-all"
                    >
                        Host Hackathon 🚀
                    </button>
                </form>

            </div>

        </div>
    )
}

export default HostHackathon