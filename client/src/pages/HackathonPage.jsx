import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEvents } from '../services/eventOperations'
import Card from '../components/Card'


const HackathonPage = () => {

    const [cards, setCards] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await getEvents();

            if (data.success) {
                if (Array.isArray(data.data)) {
                    setCards(data.data);
                } else {
                    console.error("Expected data to be an array, got:", data.data);
                }
            }
        }

        getData();
    }, [])

    return (
        <div className="main h-full flex flex-wrap items-center justify-center gap-10">
            {cards.map((item) => (
                <Link key={item._id} to={`/hackathons/${item._id}`}>
                    <Card {...item} />
                </Link>
            ))}
        </div>
    )
}

export default HackathonPage