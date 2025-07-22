import React from 'react'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getConnections } from '../services/connectionOperation'
import { createTeam } from '../services/teamOperations'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiSearch, FiUser, FiUsers } from 'react-icons/fi'

const CreateTeam = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('')

  useEffect(() => {
    const getConnection = async () => {
      if (!isLoaded && !user) return;

      const email = user?.primaryEmailAddress?.emailAddress;

      const data = await getConnections(email);
      if (data.success) {
        setConnections(data.data);
      } else {
        console.error("Error fetching users:");
      }
    }

    getConnection();

  }, [isLoaded, user])

  const getUsername = (connection) => {
    const currentEmail = user?.primaryEmailAddress?.emailAddress;
    const targetEmail = connection.senderEmail === currentEmail ? connection.receiverEmail : connection.senderEmail;
    return targetEmail;
  };

  const filteredUsers = connections
    .map(conn => ({ _id: conn._id, email: getUsername(conn), username: getUsername(conn).split('@')[0] }))
    .filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      setError('Please select at least one user');
      return;
    }

    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }

    const currUserEmail = user?.primaryEmailAddress?.emailAddress;

    const emailToId = {};
    connections.forEach(conn => {
      const email = getUsername(conn);
      const id = conn._id;
      emailToId[email] = id;
    });

    const fullTeamEmails = [...new Set([...selectedUsers, currUserEmail])]; // ensure no duplicates
    const fullTeamIds = fullTeamEmails.map(email => email === currUserEmail ? (connections[0].senderEmail === currUserEmail ? connections[0].senderId : connections[0].receiverId) : emailToId[email]);

    const teamObject = {
      teamName: teamName.trim(),
      teamLeader: currUserEmail,
      teamEmails: fullTeamEmails,
      teamIds: fullTeamIds
    };

    const req = await createTeam(teamObject);
    if(req.success){
      setError('')
      setTeamName('')
      setSelectedUsers([])
      setSearchQuery('');
    }
  }


  const handleUserSelect = (email) => {
    setSelectedUsers(prev =>
      prev.includes(email)
        ? prev.filter(id => id !== email)
        : [...prev, email]
    );
  };

  return (
    <div className="h-full bg-gray-50">
      
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              // Changed to use navigate(-1) to go back
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full mr-4 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Create New Team</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm">
          {selectedUsers.length > 0 && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                {selectedUsers.length > 1 ? (
                  <FiUsers className="w-5 h-5 text-blue-500" />
                ) : (
                  <FiUser className="w-5 h-5 text-blue-500" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4">
            {selectedUsers.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter team name"
                />
              </div>
            )}

            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search users..."
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${selectedUsers.includes(user.email)
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  onClick={() => handleUserSelect(user.email)}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedUsers.includes(user.email)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                      }`}>
                      {selectedUsers.includes(user.email) && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              onClick={()=>handleSubmit}
              className="mt-6 w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-gray-400"
              disabled={!teamName || selectedUsers.length === 0}
            >
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTeam