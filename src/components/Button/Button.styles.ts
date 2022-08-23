import styled, { css } from 'styled-components'

export interface ButtonStyleProps {
  mode?: 'default' | 'filled' | 'confirm' | 'cancel' | 'edit' | 'exit' | 'modal'
  labelColor?: string
  fontSize?: number
  unitType?: 'rem' | 'px' | string
}

export const Container = styled.div``

export const StyledButton = styled.button<ButtonStyleProps>`
  padding: 1rem 2.4rem;
  border-radius: 20px;

  font-size: ${({ fontSize, unitType }) =>
    fontSize ? `${fontSize}${unitType}` : `1.3${unitType}`};
  font-weight: 500;

  ${({ mode }) =>
    mode === 'default' &&
    css`
      background-color: transparent;
      border: 1px solid #fff;
      color: #fff;
    `}

  ${({ mode }) =>
    mode === 'filled' &&
    css`
      background-color: #fff;
      border: none;
      color: #ff7400;
    `}

    ${({ mode }) =>
    mode === 'confirm' &&
    css`
      background-color: #26ca60;
      border: none;
      color: #fff;

      :disabled {
        background-color: lightgray;
      }
    `}

    ${({ mode }) =>
    mode === 'edit' &&
    css`
      border: none;
      color: #fe5000;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    `}

    ${({ mode }) =>
    mode === 'exit' &&
    css`
      border: 1px solid #7a7a7a;
      color: #7a7a7a;
    `}

    ${({ mode }) =>
    mode === 'modal' &&
    css`
      background-color: #ff7400;
      border: none;
      color: white;
    `}

  :hover {
    cursor: pointer;
    opacity: 0.9;
    transition: 300ms;
  }
`
