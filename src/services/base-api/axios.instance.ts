import axios, { AxiosInstance, AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IBasePath } from './basePaths'

export class HttpClient {
  private readonly defaultTimeout = 10000
  private httpClient: AxiosInstance

  public baseUrl: string = ''
  public timeout: number = 3000
  
  constructor (baseUrl: IBasePath, timeout?: number){
    this.baseUrl = baseUrl.basePath
    this.timeout = timeout || this.defaultTimeout

    this.httpClient = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
    })
  }

  public async get(body: any, headers?: AxiosRequestHeaders, endpoint?: string): Promise<AxiosPromise> {
    return await this.httpClient.get(endpoint || '/')
  }
}