import React from 'react'

// Pages
import Routes from 'routes'

import { AuthProvider } from 'contexts/auth'

// CSS styles
import 'assets/styles/global.css'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App