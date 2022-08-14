import { HttpClient, BasePaths } from '../base-api'
import { AxiosRequestHeaders } from 'axios'

export class authApi {
    httpClient: HttpClient

    constructor(){
      this.httpClient = new HttpClient(new BasePaths().getBaseurlOfAuthApi())
    }

    public login(body?: any, headers?:AxiosRequestHeaders){
      
    }
}