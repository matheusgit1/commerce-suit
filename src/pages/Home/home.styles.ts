import React from "react";
import styled, { css } from "styled-components";
import img from "../../assets/background-global.jpg"

export const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  height: auto;
  flex-direction: column;
  flex: 1;
  align-items: center;
  max-width: 100%;
  background-color: transparent;
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

export const FlexRow = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const CategoryTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  opacity: 0.6;
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`