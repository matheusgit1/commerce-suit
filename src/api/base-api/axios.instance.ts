import axios, { AxiosInstance, AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IBasePath } from './basePaths'

export class HttpClient {
  private readonly defaultTimeout = 10000
  public execute: AxiosInstance

  public baseUrl: string = ''
  public timeout: number = 7000
  
  constructor (baseUrl: IBasePath, timeout?: number){
    this.baseUrl = baseUrl.basePath
    this.timeout = timeout || this.defaultTimeout

    this.execute = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
    })
  }
}