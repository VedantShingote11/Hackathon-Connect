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

const AppLayout = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

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
        <Route path='/hackathons' element={<HackathonPage/>}/>
        <Route path='/hackathons/:hackathonId' element={<EventDetails/>}/>
        <Route path='/search' element={<SearchPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
