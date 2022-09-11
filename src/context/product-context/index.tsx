import React from 'react';
import { message } from 'antd'
import { AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IFilter } from '../../services'
import { ProductApi, PurchaseApi, ICreatePurchase } from '../../services'
import { useAuthContext } from '../auth-context/useAuthContext'


export type ProductContextType = {
  // user: user | undefined,
  getListProductWithLimit: (limit: number) => AxiosPromise
  getListProductByCategory: (filter: IFilter) => AxiosPromise
  addToWishList: (productId: string, token: string) => AxiosPromise
  removeFromWishlist: (productId: string, token: string) => AxiosPromise
  addToCartIds: (productId: string) => void
  getProductById: (productId: string) => AxiosPromise
  addProductIntoCart: (productId: string, token: string) => AxiosPromise
  getUserCartInDetails: (token: string, pagination: number) => AxiosPromise
  removeFromCart: (token: string, productId: string) => AxiosPromise
  removeIdFromCartIds: (productId: string) => void
  getUserWishlistInDetails: (token: string, pagination: number) => AxiosPromise
  createPurchase: (body: ICreatePurchase, token?: string) => AxiosPromise
  updateCart: (productId: string, newQuantie: number, token?: string) => AxiosPromise
  createCart: (productId: string, quantity: number, token?: string) => AxiosPromise
  wishList: string[]
  cartIds: string[]
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
  const [cartIds, setCartIds] = React.useState<string[]>([])

  //get all in wish list
  React.useEffect(() => {
    const initialize = async () => {
      if (!authContext.user) return
      try {
        const { data } = await purchaseApi.listWishlist(authContext.user?.access_token || "")
        for (const index in data) {
          setWishList(oldArray => [...oldArray, data[index].co_product_id])
        }
      } catch (error: any) {
        message.error("não foi possivel listar sua lista de desejos")
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
        for (const index in data) {
          setCartIds(oldArray => [...oldArray, data[index]?.co_product_id])
        }
      } catch (error: any) {
        //do somethnig
      }
    }
    initialize()
  }, [authContext.user])

  const removeIdFromCartIds = (productId: string) => {
    setCartIds(cartIds.filter(values => values != productId))
  }

  const addToCartIds = (productId: string) => {
    setCartIds(oldArray => [...oldArray, productId])
  }

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

  const getUserCartInDetails = async (token: string, pagination: number) => {
    const response = await purchaseApi.getUserCartInDetails(token, pagination)
    return response
  }

  const removeFromCart = async (token: string, productId: string) => {
    const response = await purchaseApi.removeFromCart(token, productId)
    return response
  }

  const getUserWishlistInDetails = async (token: string, pagination: number) => {
    const response = await purchaseApi.getUserWishlistInDetails(token, pagination)
    return response
  }

  const createPurchase = async (body: ICreatePurchase, token?: string) => {
    const response = await purchaseApi.createPurchase(body, token)
    return response
  }

  const updateCart = async (productId: string, newQuantie: number, token?: string) => {
    const response = await purchaseApi.updateCart(productId, newQuantie, token)
    return response
  }

  const createCart = async (productId: string, quantity: number, token?: string) => {
    const response = await purchaseApi.createCart(productId, quantity, token)
    return response
  }

  return (
    <ProductContext.Provider
      value={{
        getListProductWithLimit,
        addToWishList,
        removeFromWishlist,
        addToCartIds,
        getListProductByCategory,
        getProductById,
        addProductIntoCart,
        getUserCartInDetails,
        removeFromCart,
        removeIdFromCartIds,
        getUserWishlistInDetails,
        createPurchase,
        updateCart,
        createCart,
        wishList,
        cartIds
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}