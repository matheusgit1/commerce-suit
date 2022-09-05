import React from 'react';
import { AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IFilter } from '../../services'
import { toast } from 'react-toastify'
import { ProductApi, PurchaseApi } from '../../services'
import { useAuthContext } from '../auth-context/useAuthContext'

export type ProductContextType = {
  // user: user | undefined,
  getListProductWithLimit: (limit: number) => AxiosPromise
  getListProductByCategory: (filter: IFilter) => AxiosPromise
  addToWishList: (productId: string, token: string) => AxiosPromise
  removeFromWishlist: (productId: string, token: string) => AxiosPromise
  getProductById: (productId: string) => AxiosPromise
  addProductIntoCart: (productId: string, token: string) => AxiosPromise
  wishList: string[]
  cartIds: IUserCart[]
}

export type ProductContextProvidersProps = {
  children: React.ReactNode,
}

interface IUserCart {
  id: string
  co_product_id: string
  co_user_id: string
  co_created_at: Date
  co_updated_at: Date
  co_quantity: number
}

export const ProductContext = React.createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProvidersProps) {
  const USER_IN_LOCAL_STORAGE = "commerce-suit-user"
  const productApi = new ProductApi()
  const purchaseApi = new PurchaseApi()

  const authContext = useAuthContext()

  const [wishList, setWishList] = React.useState<string[]>([])
  const [cartIds, setCartIds] = React.useState<IUserCart[]>([])

  //get all in wish list
  React.useEffect(() => {
    const initialize = async () => {
      if (!authContext.user) return
      try {
        const { data } = await purchaseApi.listWishlist(authContext.user?.access_token || "")
        for (const index in data) {
          setWishList(oldArray => [...oldArray, data[index]])
        }
      } catch (error: any) {
        //do somethnig
      }
    }
    initialize()
  }, [authContext.user])


  //get all products in cart
  React.useEffect(() => {
    const initialize = async () => {
      if (!authContext.user) return
      try {
        const { data } = await purchaseApi.getUserCart(authContext.user?.access_token || "")
        // console.log(data)
        for (const index in data) {
          console.log(data[index]?.co_product_id)
          setCartIds(oldArray => [...oldArray, data[index]?.co_product_id])
        }
      } catch (error: any) {
        //do somethnig
      }
    }
    initialize()
  }, [authContext.user])

  const getListProductWithLimit = async (limit: number) => {
    const response = await productApi.getListProductWithLimit(limit)
    return response
  }
  const getListProductByCategory = async (
    body: IFilter) => {
    const response = await productApi.getListProductByCategory(body)
    return response
  }

  const addToWishList = async (productId: string, token: string) => {
    const response = await purchaseApi.insertInWishList(productId, token)
    setWishList(oldArray => [...oldArray, productId])
    return response
  }

  const removeFromWishlist = async (productId: string, token: string) => {
    const response = await purchaseApi.removeFromWishlist(productId, token)
    setWishList(wishList.filter(productIdContent => productIdContent !== productId));
    return response
  }

  const getProductById = async (productId: string) => {
    const response = await productApi.getProductById(productId)
    return response
  }

  const addProductIntoCart = async (productId: string, token: string) => {
    const response = await purchaseApi.addProductIntoCart(productId, token)
    return response
  }


  return (
    <ProductContext.Provider
      value={{
        getListProductWithLimit,
        addToWishList,
        removeFromWishlist,
        getListProductByCategory,
        getProductById,
        addProductIntoCart,
        wishList,
        cartIds
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}