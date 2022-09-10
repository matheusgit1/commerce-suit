import React from 'react'
import { Table } from 'antd'

interface IProductFeatures {
  title: string
  body: {
    [x: string]: string
  }
}

interface props {
  data?: IProductFeatures[]
}

export const ProductFeatures: React.FC<props> = ({ data }) => {

  React.useEffect(() => {
    console.log("features: ", data)
  }, [data])
  return (
    <React.Fragment>
      <h1>Features</h1>
    </React.Fragment>
  )
}