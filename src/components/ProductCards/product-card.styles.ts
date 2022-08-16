import styled from 'styled-components'

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 15px 15px;
  width: 200px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-color: #fff;
  margin: 12px 16px;
  height: auto;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }
`;

interface CardProductImageProps extends React.HTMLAttributes<HTMLImageElement>{
  bg?: string
}

export const CardProductImage = styled.img<CardProductImageProps>`
  width: 100%;
  height: 200px;
`
export const CardProductPrice = styled.p`
  margin-top: 10px;
  font-size: 3rem;
  font-weight: 500;
  color: #403e3e;
`
export const CardProductDiscount = styled.p`
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 500;
  color: #fa4537;
`

export const CardProductButtomContainer = styled.div`
  display: flex;
  flex: 100%;
  align-items: flex-end;
  width: 100%;
`
export const CardProductButtom = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #e0b831;
  color: #fff;
  font-size: 2rem;
  
  :hover {
    background: #dde17d;
    cursor: pointer;
  }
`