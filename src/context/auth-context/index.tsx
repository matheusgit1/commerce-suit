import React from 'react';

export type user = {
  id: string
  name: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  access_token: string
}
  
export type AuthContextType = {
  user: user | undefined,
  createUser: (data: user) => void
}

export type AuthContextProvidersProps = {
  children: React.ReactNode,
}
  
export const AuthContext = React.createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProvidersProps){

  const [user, setUser] = React.useState<user | undefined>();

  const createUser = (data: user) => {
    setUser(data)
  }
    
  React.useEffect(()=>{
    //do something
  },[]);


  return(
    <AuthContext.Provider value={{user, createUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}