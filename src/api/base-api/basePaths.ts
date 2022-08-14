export interface IBasePath {
  basePath: string
  timeout: number
}

export class BasePaths {

  constructor(){
    //implements here later
  }

  public getBaseurlOfAuthApi(): IBasePath{
    return { basePath: 'http://127.0.0.1:3000/v1/auth', timeout: 15000 }
  }
}