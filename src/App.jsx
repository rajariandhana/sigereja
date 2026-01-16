import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import UnderMaintenance from './components/UnderMaintenance'
import Participants from './components/Participants/Participants'
import ParticipantEdit from './components/Participants/ParticipantEdit'
import Ministries from './components/Ministries/Ministries'
import PrayerGroups from './components/PrayerGroups/PrayerGroups'
import ParticipantCreate from './components/Participants/ParticipantCreate'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Participants />} />
        <Route path="/jemaat" element={<Participants />} />
        <Route path="/jemaat/tambah" element={<ParticipantCreate />} />
        <Route path="/jemaat/:participantId" element={<ParticipantEdit />} />
        <Route path="/wadah" element={<Ministries />} />
        <Route path="/kelompok-doa" element={<PrayerGroups />} />
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="*" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  )
}

export default App