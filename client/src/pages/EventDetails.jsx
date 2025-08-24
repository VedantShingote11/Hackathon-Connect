import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventDetails } from '../services/eventOperations';

const EventDetails = () => {

    const { hackathonId } = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await getEventDetails(hackathonId);
            if(res.success){
                setData(res.data);
            }
        }

        getData();
    }, [])
    
    useEffect(() => {
    }, [data])
    

    return (
        <div className="flex flex-col w-[60vw] m-auto bg-white shadow-lg rounded-lg p-6 mt-10 space-y-6">
            <p className="text-gray-700 leading-7">
                {data.description}
            </p>
            <div className="space-y-2">
                <span className="block text-lg font-medium text-gray-800">
                    Prize Pool: <span className="text-blue-600">$10,000</span>
                </span>
                <span className="block text-lg font-medium text-gray-800">
                    Venue: <span className="text-blue-600">New York City</span>
                </span>
                <span className="block text-lg font-medium text-gray-800">
                    Other: <span className="text-blue-600">Virtual & In-person</span>
                </span>
            </div>

            <a href={data.registrationLink}>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Participate
                </button>
            </a>
        </div>
    )
}

export default EventDetails