import { HttpClient, BasePaths } from '../../api'
import { AxiosRequestHeaders } from 'axios'

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  email: string
  name: string
  document: string
  phone: string
  password: string
  confirmPassword: string
}

export interface IVerifyAcountBody {
  email: string,
  verifyCode: string
}

export interface IResentVerifyCode{
  email: string
}

export interface IResetPassword{
  email: string
}

export interface IResetPasswordWithoutLogin{
  email: string
  token: string
  password: string
  confirmPassword: string
}

export class AuthApi {
    public httpClient: HttpClient

    constructor(){
      this.httpClient = new HttpClient(new BasePaths().getBaseurlOfAuthApi())
    }

    public async login(body: ILogin, headers?:AxiosRequestHeaders){
      const response = await this.httpClient.execute.post('/users/login', body, headers || {})
      return response
    }

    public async register(body: IRegister, headers?:AxiosRequestHeaders){
      const response = await this.httpClient.execute.post('/users/create', body, headers || {})
      return response
    }

    public async verifyAcount(body: IVerifyAcountBody, headers?:AxiosRequestHeaders){
      const response = await this.httpClient.execute.post('/users/validate', body, headers || {})
      return response
    }

    public async resentVerifyCode(body: IResentVerifyCode, headers?:AxiosRequestHeaders){
      const response = await this.httpClient.execute.post('/users/validate/resent-verify-code', body, headers || {})
      return response
    }

    public async resetPassword (body: IResetPassword, headers?:AxiosRequestHeaders){
      const response = await this.httpClient.execute.put('/users/resete-password', body, headers || {})
      return response
    }

    public async changePasswordWithoutLogin(body: IResetPasswordWithoutLogin, headers?:AxiosRequestHeaders){
      const {token,...rest} = body
      const response = await this.httpClient.execute.put(`/users/resete-password/${body.token}`,{email: body.email, password: body.password, confirmPassword: body.confirmPassword }, headers  || {})
      return response
    }
}