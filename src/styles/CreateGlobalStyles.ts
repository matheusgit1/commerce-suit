import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Montserrat', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  *, button, input {
    border: 0;
    background: none;
  }

  @media (max-width: 768px) {
    html {
      font-size: 55%;
    }

    h1, h2 {
      font-size: 4.2rem!important;
    }
  }

  @media (max-width: 500px) {
    html {
      font-size: 50%;
    }

    h1, h2 {
      font-size: 3.2rem!important;
    }
  }

  @media (max-width: 430px) {
    html {
      font-size: 50%;
    }

    h1, h2 {
      font-size: 3rem!important;
    }
  }

  @media (max-width: 380px) {
    html {
      font-size: 45%;
    }

    h1, h2 {
      font-size: 2.5rem!important;
    }
  }
`
