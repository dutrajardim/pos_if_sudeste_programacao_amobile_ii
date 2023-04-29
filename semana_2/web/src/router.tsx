import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing'
import CoachList from './pages/CoachList'
import CoachForm from './pages/CoachForm'

export default createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/study", element: <CoachList /> },
  { path: "/give-classes", element: <CoachForm /> }
])