import { HttpClient, BasePaths } from '../../api'
import { AxiosRequestHeaders } from 'axios'

export interface IAdressFormat{
  id: string
  city: string
  userId: string
  street: string
  district: string
  zipCode: string
  number: number
  block: any
  state: string
  uf: string
  reference: string
}

export interface IUpdateAdressFormat{
  city: string
  street: string
  district: string
  zipCode: string
  number: number
  block: string
  state: string
  uf: string
  reference: string
  adressId: string
}

export interface IDeleteAdressFormat{
  adressId: string
}

export interface IRegisterAdressFormat{
  street: string
  district: string
  zipCode: string
  number: number,
  block: string,
  state: string
  uf: string
  reference: string
  city: string
}

export class AdressApi {
  public httpClient: HttpClient

  constructor(){
    this.httpClient = new HttpClient(new BasePaths().getBaseurlOfAdressApi())
  }

  public async listUserAdress(token?: string){
    const response = await this.httpClient.execute.get('/list',{headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async updateUserAdress(body: IUpdateAdressFormat, headers?:AxiosRequestHeaders){
    const response = await this.httpClient.execute.put('/edit',body, {headers: headers || {}})
    return response
  }

  public async deleteUserAdress(body: IDeleteAdressFormat, headers?: AxiosRequestHeaders){
    const response = await this.httpClient.execute.delete('/delete',{headers: headers || {}, data: body})
    return response
  }

  public async registerANewAdressOfUser(body: IRegisterAdressFormat, token?: string){
    const response = await this.httpClient.execute.post('/create', body, {headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

}

