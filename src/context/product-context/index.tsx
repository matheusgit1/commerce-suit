import React from 'react';
import { AxiosRequestHeaders, AxiosPromise } from 'axios'
import { ProductApi } from '../../services'
  
export type ProductContextType = {
  // user: user | undefined,
  getListProductWithLimit: () => AxiosPromise
  addToWishList: (productId: string) => void
}

export type ProductContextProvidersProps = {
  children: React.ReactNode,
}
  
export const ProductContext = React.createContext({} as ProductContextType );

export function ProductContextProvider(props: ProductContextProvidersProps){
  const USER_IN_LOCAL_STORAGE = "commerce-suit-user"
  const productApi = new ProductApi()
  React.useEffect(()=>{
    const initialize = () => {
      
    }
    initialize()
  },[])

  const getListProductWithLimit = async () => {
    const response = await productApi.getListProductWithLimit(10)
    return response
  }

  const addToWishList = async (productId: string) => {
    alert("wish list - context product")
    return
  }
 

  return(
    <ProductContext.Provider value={{getListProductWithLimit, addToWishList}}>
      {props.children}
    </ProductContext.Provider>
  );
}