export interface IBasePath {
  basePath: string
}

export class BasePaths {

  constructor(){
    //implements here later
  }

  public getBaseurlOfAuthApi(): IBasePath{
    return { basePath: 'http://localhost:3000/v1' }
  }
}