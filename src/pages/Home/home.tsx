import React from "react";
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { CarouselWrapper, CarouselButton, Container, FlexRow, CategoryTitle } from './home.styles'
import { ProductCards } from '../../components'
import { useProductContext } from '../../context'
import Carousel from 'nuka-carousel'


interface props {}



export const Home: React.FC<props> = ({}) => {

  const productContext = useProductContext()

  const [listProduct, setListProduct] = React.useState<Array<any>>()

  React.useEffect(()=>{
    const initialize = async () => {
      const {data} = await productContext.getListProductWithLimit()
      setListProduct(data)
      return
    }

    initialize()
  },[])
  
  return(
    <React.Fragment>
      <Container>
        <CategoryTitle> Ultimos anúncios </CategoryTitle>
        <FlexRow>
          {
            listProduct?.map((values,index)=>(
              <ProductCards key={index} data={values}/>
            ))
          }
          
        </FlexRow>
        
      </Container>
      {/* <CarouselWrapper>
        <Carousel imagesUrls={mockImages} />
        <CarouselButton>Eu quero!</CarouselButton>
      </CarouselWrapper> */}
    </React.Fragment>
  )
}