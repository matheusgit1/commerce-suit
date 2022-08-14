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
}