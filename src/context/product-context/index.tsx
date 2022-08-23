import React from 'react';
import { AxiosRequestHeaders, AxiosPromise } from 'axios'
import { IFilter } from '../../services'
import { toast } from 'react-toastify'
import { ProductApi } from '../../services'

export type ProductContextType = {
  // user: user | undefined,
  getListProductWithLimit: () => AxiosPromise
  getListProductByCategory: (filter: IFilter) => AxiosPromise
  addToWishList: (productId: string) => Promise<boolean>
  getProductById: (productId: string) => AxiosPromise
  wishList: string[]
}

export type ProductContextProvidersProps = {
  children: React.ReactNode,
}

export const ProductContext = React.createContext({} as ProductContextType);

export function ProductContextProvider(props: ProductContextProvidersProps) {
  const USER_IN_LOCAL_STORAGE = "commerce-suit-user"
  const productApi = new ProductApi()
  React.useEffect(() => {
    const initialize = () => {

    }
    initialize()
  }, [])

  const [wishList, setWishList] = React.useState<string[]>([])

  const getListProductWithLimit = async () => {
    const response = await productApi.getListProductWithLimit(10)
    return response
  }
  const getListProductByCategory = async (
    body: IFilter) => {
    const response = await productApi.getListProductByCategory(body)
    return response
  }

  const addToWishList = async (productId: string): Promise<boolean> => {
    if (wishList.includes(productId)) {
      setWishList(wishList.filter(item => item !== productId));
      toast.warn("[simulação] - removido da lista de desejos")
      return false
    }
    toast.success("[simulação] - adiconado a lista de desejos")
    wishList.push(productId)
    return true
  }

  const getProductById = async (productId: string) => {
    const response = await productApi.getProductById(productId)
    return response
  }


  return (
    <ProductContext.Provider value={{
      getListProductWithLimit,
      addToWishList,
      getListProductByCategory,
      getProductById,
      wishList
    }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}