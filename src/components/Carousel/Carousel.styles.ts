import styled from 'styled-components'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
//@ts-ignore
import { Carousel } from 'react-responsive-carousel'

type CarouselImageProps = {
  src: string
}

export const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;

  position: absolute;
`

export const CarouselImage = styled.div<CarouselImageProps>`
  min-height: 65vh;

  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
