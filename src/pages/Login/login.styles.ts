import styled from 'styled-components'
import img from "../../assets/background-global.jpg"

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-image: url(${img});
  background-size: 15px 15px;
  background-color: #e0b831;
`

export const Title = styled.h3`
  font-size: 4rem;
  color: #000;
`