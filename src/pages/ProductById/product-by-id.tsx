import React from 'react'
import { ProductDetails, WithoutContent } from '../../components'

import {
  Divider,
  Row,
  Typography,
  Col,
  Pagination,
} from 'antd'


import { useProductContext } from '../../context'

import {
  useParams,
  useLocation
} from 'react-router-dom'

import {
  ProductCards,
  ProductFeatures
} from '../../components'

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

export default function ({ }) {
  const params = useParams()
  const location = useLocation()
  const productContext = useProductContext()
  const [productdata, setProductData] = React.useState<IProduct>()

  const [listProduct, setListProduct] = React.useState<Array<any>>()
  const [indexPagination, setIndexPagination] = React.useState<number>(1)

  //carrega lista de ultimos anuncios (genericos)
  React.useEffect(() => {
    const initialize = async () => {
      const { data } = await productContext.getListProductWithLimit(indexPagination - 1)
      console.log(data.length)
      setListProduct(data)
      return
    }
    initialize()
  }, [indexPagination])


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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1000, marginTop: 30 }}>
          {/* @ts-ignore */}
          <ProductDetails data={location.state?.data || productdata} wishListButton={true} />
          {/* <Row style={{ justifyContent: "flex-end", marginTop: 5 }}>*/}
          <div style={{ marginTop: 55 }}></div>
          {/* @ts-ignore */}
          <ProductFeatures data={location.state?.data.features || productdata} />
          <Divider style={{ width: 16 }} orientation="left">
            <Title style={{ margin: 45 }}> Relacionados </Title>
          </Divider>

          {
            listProduct?.length === 0 && (
              <WithoutContent />
            )
          }

          <Row style={{ justifyContent: "space-around" }} >

            {
              listProduct?.map((values, index) => (
                <Col key={index}>
                  <ProductCards key={index} data={values} />
                </Col>
              ))
            }
          </Row>
          <Row style={{ justifyContent: "space-around", marginTop: 15, marginBottom: 15 }} >
            <Pagination onChange={(e) => setIndexPagination(e)} defaultCurrent={1} total={1000} />
            {/* (listProduct?.length || 20) / 20 */}
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}