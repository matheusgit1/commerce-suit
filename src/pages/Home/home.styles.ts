import React from "react";
import styled, { css } from "styled-components";
import img from "../../assets/background-global.jpg"

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  background-color: #e0b831;
  background-size: 100% 100%;
  width: 100%;
`

export const Title = styled.h3`
  font-size: 4rem;
  color: #000;
`

interface PageContainerProps  extends React.HTMLAttributes<HTMLDivElement>{
  image: string
}

export const CarouselWrapper = styled.section`
  width: auto;

  min-height: 65vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`

export const CarouselButton = styled.button`
  position: absolute;
  z-index: 3;

  bottom: 10%;

  padding: 1rem 2.4rem;
  border-radius: 20px;

  font-size: 1.3rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  color: black;

  @media (min-width: 768px) {
    right: 10%;
  }

  :hover {
    cursor: pointer;
    opacity: 0.8;
    background-color: #fffdee;
    transition: 300ms;
  }
`