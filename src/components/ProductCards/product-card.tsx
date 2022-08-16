import React from 'react'
import {
  CardWrapper,
  CardProductImage,
  CardProductButtomContainer,
  CardProductPrice,CardProductButtom,
  CardProductDiscount
} from './product-card.styles'
import { HiTag } from 'react-icons/hi'
import { useProductContext } from '../../context'
interface IProductFeatures {
  title: string
  body: {
      [x: string]: any
  }
}

interface IProduct {
  id: string
  name: string
  price: string
  description: string
  categories: string[]
  mainCategories: string
  installments: string
  images: string[]
  discount: string
  marc: string
  conditions: string
  features: IProductFeatures[]
  isActive: boolean
}

interface props{
  data: IProduct
}


export const ProductCards: React.FC<props> = ({data}) => {
  const productContext = useProductContext()
  React.useEffect(()=>{
    // console.log("use: ", data)
    //do something
  },[])

  const addToWishList = async () => {
     //to-do implementes wish to wish list
     const response = await productContext.addToWishList(data.id)
     return
  }

  return(
    <React.Fragment>
      <CardWrapper>
        <CardProductImage src={data.images[0] ?? 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg' }/>
        <CardProductPrice> R$ {data.price} </CardProductPrice>
        <CardProductDiscount> {data.discount && +data.discount != 0 ? `-R$${data.discount} OFF` : ""}</CardProductDiscount>
        <CardProductButtomContainer>
          <CardProductButtom onClick={()=>addToWishList()}> Lista de desejos <HiTag color="#fff" size={25}/> </CardProductButtom>
        </CardProductButtomContainer>
      </CardWrapper>
    </React.Fragment>
  )
}