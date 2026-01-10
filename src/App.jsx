import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import UnderMaintenance from './components/UnderMaintenance'
import Participants from './components/Participants/Participants'
import ParticipantDetail from './components/Participants/ParticipantDetail'
import Ministries from './components/Ministries/Ministries'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Participants />} />
        <Route path="/jemaat" element={<Participants />} />
        <Route path="/jemaat/:participantId" element={<ParticipantDetail />} />
        <Route path="/wadah" element={<Ministries />} />
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="*" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  )
}

export default App