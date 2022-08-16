import React, { useState } from 'react'
import { AuthContextProvider, ProductContextProvider } from './context'

import { Routing } from './routes'
import CreateGlobalStyle from './styles/CreateGlobalStyles'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <>
          <Routing/>
          <CreateGlobalStyle/>
        </>
      </ProductContextProvider>
    </AuthContextProvider>
      
  )
}

export default App
