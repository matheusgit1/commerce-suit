import React from "react"
import { Card, Modal, Row, Typography, Rate, Image, Button, message, Space, Col } from 'antd';
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { ShoppingTwoTone, TagTwoTone, ProfileTwoTone } from '@ant-design/icons'
import { useProductContext, useAuthContext } from '../../context'
import ReactImageMagnify from 'react-image-magnify'

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

interface props {
  data: IProduct
  isComplete?: boolean,
  wishListButton?: boolean,
}

export const ProductDetails: React.FC<props> = ({ data, isComplete = false, wishListButton = false }) => {

  const { width } = useWindowDimensions()
  const { Text, Title, Paragraph } = Typography

  const productContext = useProductContext()
  const authContext = useAuthContext()

  const [fileList, setFileList] = React.useState<string[]>(data.images)

  const addToWishList = async () => {
    try {
      const response = await productContext.addToWishList(data.id, authContext.user?.access_token || "")
      message.success("adicionado a sua lista de desejos!")
      return
    } catch (error) {
      message.success("erro ao concluir ação")
      return
    }
  }

  const removeFromWishlist = async () => {
    try {
      const response = await productContext.removeFromWishlist(data.id, authContext.user?.access_token || "")
      message.warn("removido da sua lista de desejos!")
      return
    } catch (error) {
      message.success("erro ao concluir ação")
      return
    }
  }

  return (
    <React.Fragment>
      <Row style={{ justifyContent: "space-around" }}>
        <Col >
          <Card
            hoverable={false}
            style={{
              width: width < 420 ? width - 70 : 380,
              height: width < 420 ? width : 420
            }}
            cover={
              <Image
                style={{
                  // width: width < 420 ? width - 70 : 380,
                  height: width < 420 ? width - 70 : 420
                }}
                src={data?.images[0]}
              />
            }
          >
          </Card>
          <Row style={{ justifyContent: "space-between", marginTop: 16 }}>
            {
              data.images.map((values, index) => (
                <Image
                  width={80}
                  height={80}
                  key={index}
                  src={values}
                />
              ))
            }
          </Row>
        </Col>
        <Col span={width < 420 ? 48 : 10}>
          <Text>{data?.conditions} | x unidades vendidas</Text>
          <Title level={3}>{data?.name}</Title>
          <Rate allowHalf defaultValue={2.5} />
          <Text>R$ {(+data?.price).toFixed(2)}</Text><br /><br />
          <Text>em até <Text type="success">{data?.installments}X de R$ {(+data?.price / +data?.installments).toFixed(2)}</Text></Text><br /><br />
          <Paragraph>{data?.description}</Paragraph>
          <Text strong>Marca: {data?.marc}</Text><br />
          <Text>{+data?.discount > 0 && `Comprando agora você garante um desconto de -R$${data?.discount}`}</Text><br />
          <Text type="success">x em estoques</Text><br /><br />
          <Text>vendido por <Text strong>{data?.seller}</Text></Text>
          {/* <Title level={3}>dados do vendendor</Title>
          <Text> vendido por {"randonstring"}</Text> */}
          {
            wishListButton && (
              <div>
                <Space>
                  <Button
                    style={{ width: 180, marginTop: 10 }}
                    danger={productContext.wishList.includes(data.id)}
                    icon={
                      <ShoppingTwoTone
                        twoToneColor={
                          !productContext.wishList.includes(data.id) ? 'blue' : 'red'}
                      />
                    }
                    key="addToWishList"
                    onClick={() => !productContext.wishList.includes(data.id) ? addToWishList() : removeFromWishlist()}
                  >
                    {!productContext.wishList.includes(data.id) ? 'lista de desejos' : 'remover dos desejos'}
                  </Button>

                  <Button
                    style={{ width: 180, marginTop: 10 }}
                    icon={
                      <TagTwoTone twoToneColor="blue" />
                    }
                    key="purchaseItem"
                    onClick={() => message.success("comprando")}
                  >
                    ir para compra
                  </Button>

                  <Button
                    style={{ width: 180, marginTop: 10 }}
                    icon={
                      <ProfileTwoTone twoToneColor="blue" />
                    }
                    key="addTocart"
                    onClick={() => message.success("comprando")}
                  >
                    adicionar ao carrinho
                  </Button>
                </Space>
              </div>
            )
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}