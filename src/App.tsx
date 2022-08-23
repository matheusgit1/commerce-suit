import React from 'react'
import { AuthContextProvider, ProductContextProvider } from './context'
import { Routing } from './routes'
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <React.Fragment>
          <Routing />
        </React.Fragment>
      </ProductContextProvider>
    </AuthContextProvider>

  )
}

export default App
