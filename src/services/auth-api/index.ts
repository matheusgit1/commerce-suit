import { HttpClient, BasePaths } from '../../api'
import { AxiosRequestHeaders } from 'axios'

export interface ILogin {
  email: string
  password: string
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
}