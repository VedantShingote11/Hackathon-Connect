import React from 'react'

const Card = ({imgUrl, heading, lastDate, mode, fee}) => {
    return (
        <div className="cursor-pointer h-[60vh] flex flex-col justify-center min-w-sm w-80 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 gap-5 my-6">
            <img
                src={imgUrl}
                alt={"Hackathon Image"}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {heading}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold">Last Date:</span> {lastDate}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold">Mode:</span> {mode}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                    <span className="font-semibold">Fees:</span> {fee}
                </p>
            </div>
        </div>
    )
}

export default Card