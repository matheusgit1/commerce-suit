import React from 'react';
import { message } from 'antd'
import {
  AuthApi,
  ILogin,
  IRegister,
  IVerifyAcountBody,
  IResentVerifyCode,
  IResetPassword,
  IResetPasswordWithoutLogin,
  AdressApi,
  IAdressFormat,
  IUpdateAdressFormat,
  IDeleteAdressFormat,
  IRegisterAdressFormat
} from '../../services'
import { AxiosRequestHeaders, AxiosPromise } from 'axios'
import { } from 'react-router-dom'

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
  userAdress: IAdressFormat | undefined
  userListAdress: IAdressFormat[] | undefined
  createUser: (data: user) => void
  login: (body: ILogin, headers?: AxiosRequestHeaders) => AxiosPromise
  logout: () => void
  register: (body: IRegister, headers?: AxiosRequestHeaders) => AxiosPromise
  verifyAcount: (body: IVerifyAcountBody, headers?: AxiosRequestHeaders) => AxiosPromise
  resentVerifyCode: (body: IResentVerifyCode, headers?: AxiosRequestHeaders) => AxiosPromise
  resetPassword: (body: IResetPassword, headers?: AxiosRequestHeaders) => AxiosPromise
  changePasswordWithoutLogin: (body: IResetPasswordWithoutLogin, headers?: AxiosRequestHeaders) => AxiosPromise
  createUserAdress: (data: IAdressFormat) => void
  updateUserAdress: (body: IUpdateAdressFormat, headers?: AxiosRequestHeaders) => AxiosPromise
  deleteUserAdress: (body: IDeleteAdressFormat, headers?: AxiosRequestHeaders) => AxiosPromise
  removeAdressFromList: (adressId: string) => void
  registerANewAdressOfUser: (body: IRegisterAdressFormat, token?: string) => AxiosPromise
  listUserAdress: (token?: string) => AxiosPromise
  createNewUserListAdress: (body: any) => void
}

export type AuthContextProvidersProps = {
  children: React.ReactNode,
}

export const AuthContext = React.createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProvidersProps) {
  const USER_IN_LOCAL_STORAGE = "commerce-suit-user"
  const ADRESS_IN_LOCAL_STORAGE = "commerce-suit-adress"

  const [user, setUser] = React.useState<user | undefined>(undefined);
  const [userAdress, setUserAdress] = React.useState<IAdressFormat | undefined>(undefined)
  const [userListAdress, setUserListAdress] = React.useState<IAdressFormat[]>([])

  const authApi = new AuthApi()
  const adressApi = new AdressApi()

  React.useEffect(() => {
    const initialize = async () => {
      const lv_user = localStorage.getItem(USER_IN_LOCAL_STORAGE)
      if (lv_user) {
        const lv_user_parsed = JSON.parse(lv_user)
        setUser(lv_user_parsed)
      }

      const lv_adress = localStorage.getItem(ADRESS_IN_LOCAL_STORAGE)
      if (lv_adress) {
        const lv_adress_parsed = JSON.parse(lv_adress)
        setUserAdress(lv_adress_parsed)
      }
    }
    initialize()
  }, [])

  React.useEffect(() => {
    const initialize = async () => {
      if (!user) return
      const res = await listUserAdress(user.access_token)
      setUserListAdress(res.data)
      return
    }
    initialize()
  }, [user])

  const createNewUserListAdress = (body: any) => {
    setUserListAdress(body)
  }

  const createUser = (data: user) => {
    localStorage.setItem(USER_IN_LOCAL_STORAGE, JSON.stringify(data))
    setUser(data)
  }

  const createUserAdress = (data: IAdressFormat) => {
    localStorage.setItem(ADRESS_IN_LOCAL_STORAGE, JSON.stringify(data))
    setUserAdress(data)
    return
  }

  const registerANewAdressOfUser = async (body: IRegisterAdressFormat, token?: string) => {
    const response = await adressApi.registerANewAdressOfUser(body, token)
    if (response.status === 200 || response.status === 201) {
      setUserListAdress(oldArray => [...oldArray, response.data]);
    }
    return response
  }

  const listUserAdress = async (token?: string) => {
    const response = await adressApi.listUserAdress(token)
    return response
  }

  const removeAdressFromList = async (adressId: string) => {
    userListAdress.map((values, index) => {
      if (values.id === adressId) {
        setUserListAdress([...userListAdress.splice(index, 1)])
        return
      }
    })
  }

  const updateUserAdress = async (body: IUpdateAdressFormat, headers?: AxiosRequestHeaders) => {
    const response = await adressApi.updateUserAdress(body, headers)
    return response
  }

  const deleteUserAdress = async (body: IDeleteAdressFormat, headers?: AxiosRequestHeaders) => {
    if (userAdress?.id === body.adressId) {
      localStorage.removeItem(ADRESS_IN_LOCAL_STORAGE)
    }
    const response = await adressApi.deleteUserAdress(body, headers)
    return response
  }

  const login = async (body: ILogin, headers?: AxiosRequestHeaders) => {
    const response = await authApi.login(body, headers || {})
    return response
  }

  const logout = async () => {
    localStorage.removeItem(USER_IN_LOCAL_STORAGE)
    localStorage.removeItem(ADRESS_IN_LOCAL_STORAGE)
    setUser(undefined)
    message.success("LOGOUT")
    return
  }

  const register = async (body: IRegister, headers?: AxiosRequestHeaders) => {
    const response = await authApi.register(body, headers || {})
    return response
  }

  const verifyAcount = async (body: IVerifyAcountBody, headers?: AxiosRequestHeaders) => {
    const response = await authApi.verifyAcount(body, headers || {})
    return response
  }

  const resentVerifyCode = async (body: IResentVerifyCode, headers?: AxiosRequestHeaders) => {
    const response = await authApi.resentVerifyCode(body, headers || {})
    return response
  }

  const resetPassword = async (body: IResetPassword, headers?: AxiosRequestHeaders) => {
    const response = await authApi.resetPassword(body, headers || {})
    return response
  }

  const changePasswordWithoutLogin = async (body: IResetPasswordWithoutLogin, headers?: AxiosRequestHeaders) => {
    const response = await authApi.changePasswordWithoutLogin(body, headers || {})
    return response
  }

  React.useEffect(() => {
    //do something
  }, []);


  return (
    <AuthContext.Provider value={{
      user,
      userAdress,
      userListAdress,
      createUser,
      login,
      logout,
      register,
      verifyAcount,
      resentVerifyCode,
      resetPassword,
      changePasswordWithoutLogin,
      createUserAdress,
      updateUserAdress,
      deleteUserAdress,
      removeAdressFromList,
      registerANewAdressOfUser,
      listUserAdress,
      createNewUserListAdress
    }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}