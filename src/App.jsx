import './App.css'

import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import UnderMaintenance from './components/UnderMaintenance'
import Participants from './components/Participants/Participants'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Participants />} />
        {/* <Route path="/participants/:participantId" element={<ParticipantDetail />} /> */}
        <Route path="/settings" element={<UnderMaintenance />} />
        <Route path="/:path" element={<UnderMaintenance />} />
      </Route>
    </Routes>
  )
}

export default App