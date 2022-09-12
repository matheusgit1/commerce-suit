import { HttpClient, BasePaths } from "../../api";
import { AxiosRequestHeaders } from "axios";

export interface IFilter {
  categories: string[];
  minValue?: number | 0;
  maxValue?: number | 999999999;
}

export class ProductApi {
  public httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(new BasePaths().getBaseurlOfProductsApi());
  }

  public async getListProductWithLimit(limit: number) {
    const response = await this.httpClient.execute.get(`/list/limit/${limit}`);
    return response;
  }

  public async getListProductByCategory(body: IFilter) {
    const response = await this.httpClient.execute.post(`/list/filters`, body);
    return response;
  }

  public async getProductById(productId: string) {
    const response = await this.httpClient.execute.get(`/${productId}`);
    return response;
  }
}
