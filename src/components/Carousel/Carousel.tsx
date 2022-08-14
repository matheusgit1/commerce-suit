import React from 'react'

import { StyledCarousel, CarouselImage } from './Carousel.styles'

interface CarouselProps {
  imagesUrls: string[]
}

export function Carousel({ imagesUrls }: CarouselProps) {
  return (
    <StyledCarousel
      autoPlay
      stopOnHover
      infiniteLoop
      showThumbs={false}
      showStatus={false}
    >
      {imagesUrls.map((url, index) => (
        <CarouselImage key={`${url}${index}`} src={url} />
      ))}
    </StyledCarousel>
  )
}
