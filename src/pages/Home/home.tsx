import React from "react";
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { CarouselWrapper, CarouselButton, Container } from './home.styles'
import { Carousel } from '../../components'
import banner from "../../assets/banners/banner-1.jpg"

interface props {}

export const Home: React.FC<props> = ({}) => {
  const {width} = useWindowDimensions()
  const mockImages = [
    'https://d8hp1nglju2zj.cloudfront.net/dry-site/cartola/main-banner-cartola.jpg',
    'https://images.unsplash.com/photo-1523800378286-dae1f0dae656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  ]
  
  return(
    <React.Fragment>

      <CarouselWrapper>
        <Carousel imagesUrls={mockImages} />
        <CarouselButton>Eu quero!</CarouselButton>
      </CarouselWrapper>

    </React.Fragment>
  )
}