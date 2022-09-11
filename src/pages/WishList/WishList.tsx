import React from 'react'
import {
  Row,
  Pagination,
  Divider,
  Typography,
  Col,
  message,
  Result,
  Button
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'
import { useAuthContext, useProductContext } from '../../context'
import { ProductDetails, ProductCards } from '../../components'
interface props { }

interface IProductFeatures {
  title: string
  body: {
    [x: string]: string
  }
}

interface IUseWishList {
  id: string
  co_created_at?: Date
  co_updated_at?: Date
  co_product_name: string
  co_product_price: string
  co_product_description: string,
  co_product_categories: string[]
  co_product_main_categories: string
  co_product_installments: string
  co_product_images: string[]
  co_user_id: string
  co_product_discount: string
  co_product_marc: string
  co_product_conditions: string
  co_product_features: IProductFeatures[]
  co_is_product_active: boolean,
  co_five_stars?: number | null
  co_four_stars?: number | null
  co_three_stars?: number | null
  co_two_stars?: number | null
  co_one_stars?: number | null
  co_zero_stars?: string
  co_product_seller: string
  co_product_stocks?: string
  co_product_id?: string
}

export const WishList: React.FC<props> = ({ }) => {
  const navigate = useNavigate()
  const authContext = useAuthContext()
  const productContext = useProductContext()
  const [pagination, setIndexPagination] = React.useState<number>(0)
  const [userWishListProducts, setUserWishListProduct] = React.useState<IUseWishList[]>([])
  const listProduct: any = undefined
  const { Title } = Typography

  React.useEffect(() => {
    const initialize = async () => {
      try {
        if (productContext.wishList.length === 0) return;
        const { data } = await productContext.getUserWishlistInDetails(authContext.user?.access_token || "", pagination)
        setUserWishListProduct(data)
      } catch (error: any) {
        message.error("Erro ao recupera sua lisa de desejos")
      }
    }
    initialize()
  }, [productContext.wishList])

  return (
    <React.Fragment>

      <Col >
        <Divider style={{ width: 16 }} orientation="left">
          <Title style={{ padding: "0px 0px" }}> Sua lista de desejos </Title>
        </Divider>
        {
          userWishListProducts.length === 0 && (
            <Result
              status="404"
              title="Lista de desejo vazia"
              subTitle="Você não possui nada adicionado a sua lista de desejos"
              extra={<Button onClick={() => navigate(paths.home)} type="primary">Voltar para o </Button>}
            />
          )
        }

        <Row style={{ justifyContent: "space-around" }} >
          {
            userWishListProducts?.map((values, index: number) => (
              // index > indexPagination[0] && index < indexPagination[1] ? {
              <Col key={index}>
                <ProductCards
                  key={index}
                  data={{
                    //@ts-ignore
                    id: values.co_product_id,
                    name: values.co_product_name,
                    price: values.co_product_price,
                    description: values.co_product_description,
                    categories: values.co_product_categories,
                    mainCategories: values.co_product_main_categories,
                    installments: values.co_product_installments,
                    images: values.co_product_images,
                    discount: values.co_product_discount,
                    marc: values.co_product_marc,
                    conditions: values.co_product_discount,
                    features: values.co_product_features,
                    isActive: values.co_is_product_active,
                    seller: values.co_product_seller
                  }}
                />
              </Col>
              // }
            ))
          }

        </Row>
        {
          userWishListProducts.length > 0 && (
            <Row style={{ justifyContent: "space-around", marginTop: 15, marginBottom: 15 }} >
              <Pagination onChange={(e) => setIndexPagination(e)} defaultCurrent={1} total={1000} />
              {/* (listProduct?.length || 20) / 20 */}
            </Row>
          )
        }
      </Col>

    </React.Fragment>
  )
}