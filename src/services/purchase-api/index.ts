import { HttpClient, BasePaths } from '../../api'
import { AxiosRequestHeaders } from 'axios'

export class PurchaseApi {
  public httpClient: HttpClient

  constructor(){
    this.httpClient = new HttpClient(new BasePaths().getBaseurlOfPurchaseApi())
  }

  public async insertInWishList(productId: string, token: string){
    const response = await this.httpClient.execute.post(`/wishlist/insert`,{productId: productId},{ headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async removeFromWishlist(productId: string, token: string){
    const response = await this.httpClient.execute.delete(`/wishlist/remove`,{data:{productId: productId}, headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async listWishlist(token: string){
    const response = await this.httpClient.execute.get(`/wishlist/list`,{ headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async addProductIntoCart(productId: string, token: string){
    const response = await this.httpClient.execute.post(`/cart/insert`,{ data: {productId: productId}, headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async getUserCart(token: string){
    const response = await this.httpClient.execute.get(`/cart/list`,{headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async getUserCartInDetails(token: string, pagination: number){
    const response = await this.httpClient.execute.get(`/cart/details/${pagination}`,{headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async removeFromCart(token: string, productId: string){
    const response = await this.httpClient.execute.delete(`/cart/remove`, {data: {productId: productId}, headers:{"Authorization": `Bearer ${token}`}})
    return response
  }

  public async getUserWishlistInDetails(token: string, pagination: number){
    const response = await this.httpClient.execute.get(`/wishlist/details/${pagination}`, {headers:{"Authorization": `Bearer ${token}`}})
    return response
  }
}