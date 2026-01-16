import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Landing from './pages/Landing'
import Survey from './pages/Survey'
import Matches from './pages/Matches'
import MentorDetail from './pages/MentorDetail'
import EmailGenerator from './pages/EmailGenerator'
import PrepChat from './pages/PrepChat'
import Reflection from './pages/Reflection'
import Progress from './pages/Progress'
import Layout from './components/Layout'

function App() {
  const [user, setUser] = useState(null)
  const [selectedMentor, setSelectedMentor] = useState(null)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/survey"
          element={<Survey user={user} setUser={setUser} />}
        />
        <Route
          path="/matches"
          element={<Matches user={user} setSelectedMentor={setSelectedMentor} />}
        />
        <Route
          path="/mentor/:id"
          element={<MentorDetail user={user} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} />}
        />
        <Route
          path="/email"
          element={<EmailGenerator user={user} mentor={selectedMentor} />}
        />
        <Route
          path="/prep"
          element={<PrepChat user={user} mentor={selectedMentor} />}
        />
        <Route
          path="/reflection"
          element={<Reflection user={user} mentor={selectedMentor} />}
        />
        <Route
          path="/progress"
          element={<Progress user={user} />}
        />
      </Routes>
    </Layout>
  )
}

export default App
