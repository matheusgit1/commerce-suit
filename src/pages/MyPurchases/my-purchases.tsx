import React from 'react'
import {
  Card,
  Typography,
  Button,
  Modal,
  Col,
  Form,
  Space,
  Skeleton,
  message,
  Result,
  Row,
  Pagination,
  Divider,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { BsTruck } from 'react-icons/bs'
import { } from 'react-icons/bs'
import { useAuthContext, useProductContext } from '../../context'
import { FormEditAdress, TAdressForm } from '../../components'
import {
  IAdressFormat
} from '../../services'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'

interface props { }

interface IProductFeatures {
  title: string
  body: {
    [x: string]: string
  }
}
interface IPurchaseList {
  id?: string
  co_created_at?: Date
  co_updated_at?: Date
  co_product_name: string
  co_product_price?: string
  co_product_description?: string
  co_product_categories?: string[]
  co_product_main_categories?: string
  co_product_installments?: string
  co_product_images: string[]
  co_user_id?: string
  co_product_discount?: string
  co_product_marc?: string
  co_product_conditions?: string
  co_product_features?: IProductFeatures[]
  co_is_product_active?: boolean,
  co_five_stars?: string | null
  co_four_stars?: string | null
  co_three_stars?: string | null
  co_two_stars?: string | null
  co_one_stars?: string | null
  co_zero_stars?: string
  co_product_seller?: string
  co_product_stocks: string
  co_product_id: string
  co_quantity?: number
}

export default function MyPurchases({ }) {
  const navigate = useNavigate()
  const authContext = useAuthContext()
  const productContext = useProductContext()

  const { Meta } = Card
  const { Title, Link, Text } = Typography
  const { width } = useWindowDimensions()

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pagination, setPagination] = React.useState<number>(0)
  const [purchaseList, setPurchaseList] = React.useState<IPurchaseList[]>([])
  // const [excluded, setExcludeds] = React.useState<string[]>([])


  //when a pagination be altered this function s calles
  React.useEffect(() => {
    const initialize = async () => {
      try {
        const { data } = await productContext.getUserCartInDetails(authContext.user?.access_token || "", pagination)
        setPurchaseList(data)
      } catch (error: any) {
        // message.error("Erro ao listar seu carrinho de compras")
      }
    }
    initialize()
  }, [pagination])


  // React.useEffect(() => {
  //   const initialize = async () => {
  //     if (purchaseList.length === 0) return;
  //   }
  //   initialize()
  // }, [purchaseList, productContext.cartIds])

  const removeFromCart = async (productName: string, productId: string) => {
    try {
      const { data } = await productContext.removeFromCart(authContext.user?.access_token || "", productId)
      //reomove id from global context
      productContext.removeIdFromCartIds(productId)
      //remove id in local context
      setPurchaseList(purchaseList.filter(values => values.co_product_id != productId))
      message.warn(`${productName} Removido de seu carrinho`)

    } catch (error: any) {
      message.error("Erro ao remover do carrinho")
    }
  }


  return (
    <React.Fragment>
      <Divider style={{ width: 16 }} orientation="left">
        <Title style={{ padding: "0px 0px" }}> Sua lista de compras </Title>
      </Divider>
      {
        purchaseList?.length === 0 && (
          <Result
            status="404"
            title="Carrinho vazio"
            subTitle="Você não possui nada ainda em seu carrinho de compras."
            extra={<Button onClick={() => navigate(paths.home)} type="primary">Ir para o inico</Button>}
          />
        )
      }
      {
        purchaseList?.map((values, index) => (
          <React.Fragment>

            <Row key={index} style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Card
                // onClick={() => width < 400 ? navigate(`/minhas-compras/checkout/${values?.co_product_id}`, { state: { data: values } }) : null}
                style={{ width: width > 700 ? 700 : width, marginTop: 8, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                hoverable
                key={`card-${index}`}
                loading={false}
                actions={[
                  <Space>
                    <Button
                      key="footer-btn-1"
                      onClick={() => {
                        // if (excluded.includes(values.co_product_id)) {
                        //   message.warn("Vôce removeu esse item do seu carrinho")
                        //   return;
                        // }
                        navigate(`/minhas-compras/checkout/${values.co_product_id}`, { state: { data: values } })
                      }
                      }
                      style={{
                        color: 'white',
                        background: '#8fce00'
                      }}
                      type="default"
                      icon={<CheckOutlined />}
                    >
                      Finalizar compra
                    </Button>
                    <Button
                      key="footer-btn-2"
                      onClick={() => removeFromCart(values.co_product_name, values.co_product_id)}
                      danger
                      icon={<DeleteOutlined />}
                    >
                      Excluir
                    </Button>
                  </Space>
                ]}
              >
                <div onClick={() => {
                  null
                }}
                >
                  <Skeleton loading={false}>
                    <Meta
                      style={{ justifyContent: "center", alignItems: "center" }}
                      avatar={width > 600 && <img style={{ width: 250, height: 250 }} src={values?.co_product_images[0] || ""} />}
                      title={
                        <>
                          <Title level={4}>{values?.co_product_name}</Title>
                        </>

                      }
                      description={
                        <>
                          {
                            width < 600 && <img style={{ width: 250, height: 250, marginBottom: 30 }} src={values.co_product_images[0]} />
                          }
                          <br />
                          <Text style={{ fontWeight: "bold", fontSize: 20 }} type="secondary">
                            Vendido por {values.co_product_seller}
                          </Text><br />
                          <Text type="secondary">
                            você está adquirindo {values.co_quantity}
                          </Text><br />
                          <Text type="secondary">
                            {values.co_product_stocks} em estoques
                          </Text><br />
                          <Text type="secondary">
                            id de compra: {values.id}
                          </Text><br />
                        </>
                      }
                    />
                  </Skeleton>
                </div>
              </Card>

            </Row>

          </React.Fragment>
        ))
      }
      {

        purchaseList.length > 0 && (
          <Row style={{ justifyContent: "space-around", marginTop: 15, marginBottom: 15 }} >
            <Pagination onChange={(e) => setPagination(e)} defaultCurrent={1} total={1000} />
            {/* (listProduct?.length || 20) / 20 */}
          </Row>
        )

      }

    </React.Fragment >
  )
}