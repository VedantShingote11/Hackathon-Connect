import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const HomePage = () => {

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Home Page</h1>
            <p>This page is accessible to everyone.</p>
            <SignedOut>
                <p>You are signed out. Please sign in to view the dashboard.</p>
                <Link to="/sign-in">
                    <button>Sign In</button>
                </Link>
            </SignedOut>
        </div>
    )
}

export default HomePage