import React from 'react'
import { AuthContext } from './index'

export const useAuthContext = () => {
  const values = React.useContext(AuthContext)
  return values
}