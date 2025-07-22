import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { userId, isLoaded } = useAuth();

    if (!isLoaded) {
        return (<div>Loading...</div>)
    }
    if (!userId) {
        return (<Navigate to="/sign-in" />)
    }
    return children;
}

export default ProtectedRoute