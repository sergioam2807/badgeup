import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import LandingPage from './pages/LandingPage'
import Programs from './pages/Programs'
import Courses from './pages/Courses'
import { Grid } from '@mui/material'
import HeaderBar from './components/HeaderBar'
import './App.css'

const ProtectedPrograms = withAuthenticationRequired(Programs)
const ProtectedCourses = withAuthenticationRequired(Courses)

function App() {
  return (
    <Router>
      <Grid>
        <RouteWrapper />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/programs' element={<ProtectedPrograms />} />
          <Route
            path='/:program/courses/:level'
            element={<ProtectedCourses />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Grid>
    </Router>
  )
}

function RouteWrapper() {
  const location = useLocation()
  return location.pathname !== '/' && <HeaderBar />
}

export default App
