import React from 'react'
import { ProductDetails } from '../../components'
import { Divider, Row, Typography, Col, Pagination } from 'antd'
import { useProductContext } from '../../context'
import { useParams, useLocation } from 'react-router-dom'
import { ProductCards } from '../../components'

interface props { }

interface IProduct {
  id: string
  name: string
  price: string
  description: string
  categories: string[]
  mainCategories: string
  installments: string
  images: string[]
  discount: string
  marc: string
  conditions: string
  features: IProductFeatures[]
  isActive: boolean
  seller: string
}

interface IProductFeatures {
  title: string
  body: {
    [x: string]: any
  }
}

export const ProductById: React.FC<props> = ({ }) => {
  const params = useParams()
  const location = useLocation()
  const productContext = useProductContext()
  const [productdata, setProductData] = React.useState<IProduct>()

  const [listProduct, setListProduct] = React.useState<Array<any>>()

  const { Title } = Typography
  React.useEffect(() => {
    const initialize = async () => {
      //@ts-ignore
      if (!location.state?.data) {
        //@ts-ignore
        const { data } = await productContext.getProductById(params?.id)
        setProductData(data)
        return
      }
      //@ts-ignore
      setProductData(location.state?.data)
      return
    }

    initialize()
  }, [])

  React.useEffect(() => {
    const initialize = async () => {
      //@ts-ignore
      if (!productdata) return
      const { data } = await productContext.getListProductByCategory({ categories: productdata.categories })
      setListProduct(data)

    }

    initialize()
  }, [productdata])

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <ProductDetails data={location.state?.data || productdata} />
      <Divider style={{ width: 16 }} orientation="left">
        <Title style={{ margin: 45 }}> Relacionados </Title>
      </Divider>
      <Row style={{ justifyContent: "space-around" }} >
        {
          listProduct?.map((values, index) => (
            <Col key={index}>
              <ProductCards key={index} data={values} />
            </Col>
          ))
        }
      </Row>
      <Row style={{ justifyContent: "space-around" }} >
        <Pagination
          total={listProduct?.length}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          defaultPageSize={20}
          defaultCurrent={1}
        />
      </Row>
    </React.Fragment>
  )
}