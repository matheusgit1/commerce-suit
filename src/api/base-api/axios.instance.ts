import axios, { AxiosInstance, AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IBasePath } from './basePaths'

export class HttpClient {
  private readonly defaultTimeout = 10000
  public execute: AxiosInstance

  public baseUrl: string = ''
  public timeout: number = 7000
  
  constructor (basepath: IBasePath){
    this.baseUrl = basepath.basePath
    this.timeout = basepath.timeout

    this.execute = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
    })
  }
}