import styled, { css } from 'styled-components'

type MenuProps = {
  $visibility: boolean
}

export const Container = styled.div<MenuProps>`
  width: 100%;
  height: 100%;

  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);

  transition: 500ms;

  opacity: 0;
  pointer-events: none;

  ${({ $visibility }) =>
    $visibility &&
    css`
      cursor: pointer;
      opacity: 1;
      pointer-events: auto;
    `}
`

export const WrapperLinks = styled.div<MenuProps>`
  width: 100%;
  height: auto;

  min-height: 20%;
  max-height: 50%;

  gap: 27px;
  padding: 44px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;

  transform: translateY(-50px);

  transition: 500ms;

  z-index: 6;

  ${({ $visibility }) =>
    $visibility &&
    css`
      cursor: auto;
      transform: translateY(0px);
    `}

  a {
    :hover {
      cursor: pointer;
      opacity: 0.8;
      transition: 500ms;
    }
  }
`

export const NavLink = styled.a`
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff7400;
`
