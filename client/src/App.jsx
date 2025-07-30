import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute';
import CreateTeam from './pages/CreateTeam'
import MyTeams from './pages/myTeams'
import HackathonPage from './pages/HackathonPage'
import EventDetails from './pages/EventDetails'
import SearchPage from './pages/SearchPage'
import HostHackathon from './pages/HostHackathon'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import Notifications from './components/Notifications'
import { useState } from 'react'

const AppLayout = () => {

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  return (

    <div className='relative'>
      <div className='sticky top-16'>
        <div onClick={toggleNotifications} className='absolute top-4 right-3 cursor-pointer'>
          <lord-icon
            src="https://cdn.lordicon.com/lznlxwtc.json"
            trigger="hover"
            style={{ width: '30px', height: '30px' }}
          />
        </div>
        {showNotifications && (
          <div className="absolute mt-14 right-0 w-80 bg-white shadow-lg rounded-lg border p-3 z-50">
            <Notifications />
          </div>
        )}
      </div>
      <NavBar />
      <Outlet />
    </div>
  )
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/myTeams' element={<MyTeams />} />
        <Route path='/createTeam' element={<CreateTeam />} />
        <Route path='/hackathons' element={<HackathonPage />} />
        <Route path='/hackathons/:hackathonId' element={<EventDetails />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/host' element={<HostHackathon />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/myTeams/:chatId' element={<ChatPage />} />
        <Route path='search/profile/:profileId' element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
