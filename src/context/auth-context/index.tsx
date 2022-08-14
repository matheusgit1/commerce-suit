import React from 'react';

export type user = {
  id: string,
  name: string,
  avatar: string,
}
  
export type AuthContextType = {
  user: user | undefined, 
}

export type AuthContextProvidersProps = {
  children: React.ReactNode,
}
  
export const AuthContext = React.createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProvidersProps){

  const [user, setUser] = React.useState<user | undefined>();
    
  React.useEffect(()=>{
    //do something
  },[]);


  return(
    <AuthContext.Provider value={{user}}>
      {props.children}
    </AuthContext.Provider>
  );
}