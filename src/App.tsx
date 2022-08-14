import React, { useState } from 'react'
import { AuthContextProvider } from './context'
import { Routing } from './routes'
import CreateGlobalStyle from './styles/CreateGlobalStyles'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <>
        <Routing/>
        <CreateGlobalStyle/>
      </>
    </AuthContextProvider>
      
  )
}

export default App
