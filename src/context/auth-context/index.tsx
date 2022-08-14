import React from 'react';
import { AuthApi , ILogin, IRegister, IVerifyAcountBody, IResentVerifyCode, IResetPassword, IResetPasswordWithoutLogin} from '../../services'
import { AxiosRequestHeaders, AxiosPromise } from 'axios'

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
  login: (body: ILogin, headers?:AxiosRequestHeaders) => AxiosPromise
  register: (body: IRegister, headers?:AxiosRequestHeaders) => AxiosPromise
  verifyAcount: (body: IVerifyAcountBody, headers?:AxiosRequestHeaders) => AxiosPromise
  resentVerifyCode: (body: IResentVerifyCode, headers?:AxiosRequestHeaders) => AxiosPromise
  resetPassword: (body: IResetPassword, headers?:AxiosRequestHeaders) => AxiosPromise
  changePasswordWithoutLogin: (body: IResetPasswordWithoutLogin, headers?:AxiosRequestHeaders) => AxiosPromise
}

export type AuthContextProvidersProps = {
  children: React.ReactNode,
}
  
export const AuthContext = React.createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProvidersProps){
  const USER_IN_LOCAL_STORAGE = "commerce-suit-user"
  const [user, setUser] = React.useState<user | undefined>();

  React.useEffect(()=>{
    const initialize = () => {
      const lv_user = localStorage.getItem(USER_IN_LOCAL_STORAGE)
      if(lv_user){
        const lv_user_parsed = JSON.parse(lv_user)
        setUser(lv_user_parsed)
      }
    }
    initialize()
  },[])

  const createUser = (data: user) => {
    localStorage.setItem(USER_IN_LOCAL_STORAGE, JSON.stringify(data))
    setUser(data)
  }

  const authApi = new AuthApi()

 const login = async (body: ILogin, headers?:AxiosRequestHeaders) => {
    const response = await authApi.login(body, headers || {})
    return response
  }

 const register = async (body: IRegister, headers?:AxiosRequestHeaders)=>{
    const response = await authApi.register(body, headers || {})
    return response
  }

 const verifyAcount = async (body: IVerifyAcountBody, headers?:AxiosRequestHeaders) =>{
    const response = await authApi.verifyAcount(body, headers || {})
    return response
  }

  const resentVerifyCode = async (body: IResentVerifyCode, headers?:AxiosRequestHeaders) =>{
    const response = await authApi.resentVerifyCode(body, headers || {})
    return response
  }
  
  const  resetPassword = async (body: IResetPassword, headers?:AxiosRequestHeaders) => {
    const response = await authApi.resetPassword(body, headers || {})
    return response
  }

  const  changePasswordWithoutLogin = async (body: IResetPasswordWithoutLogin, headers?:AxiosRequestHeaders) => {
    const response = await authApi.changePasswordWithoutLogin(body, headers || {})
    return response
  }

  React.useEffect(()=>{
    //do something
  },[]);


  return(
    <AuthContext.Provider value={{user, createUser, login, register, verifyAcount, resentVerifyCode, resetPassword, changePasswordWithoutLogin}}>
      {props.children}
    </AuthContext.Provider>
  );
}