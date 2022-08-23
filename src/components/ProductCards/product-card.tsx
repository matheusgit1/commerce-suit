import React from 'react';
import { HiTag } from 'react-icons/hi'
import { useProductContext } from '../../context'
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { Card, Modal, Button } from 'antd';
import { ShoppingTwoTone, HeartTwoTone } from '@ant-design/icons'
import { ProductDetails } from '..'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'

interface IProductFeatures {
  title: string
  body: {
    [x: string]: any
  }
}

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

interface props {
  data: IProduct
}


export const ProductCards: React.FC<props> = ({ data }) => {
  // const { width } = useWindowDimensions()
  const { Meta } = Card;
  const productContext = useProductContext()
  const navigate = useNavigate()
  React.useEffect(() => {
    // console.log("use: ", data)
    //do something
  }, [])

  const addToWishList = async () => {
    const response = await productContext.addToWishList(data.id)
    if (response) {
      setInWishListColor('red')
      return
    }
    setInWishListColor('gray')
  }

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false)
  const [InWishListColor, setInWishListColor] = React.useState<string>('gray')

  React.useEffect(() => {

  }, [InWishListColor])

  const elipses = (): string => {
    if (data.description.length > 27) {
      return data.description.slice(0, 24) + '...'
    }
    return data.description
  }
  return (
    <React.Fragment>
      <Modal
        title={data.name.toUpperCase()}
        centered
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={850}
        style={{ padding: 0 }}
        footer={[
          <Button icon={<ShoppingTwoTone />} key="addToWishList" onClick={() => addToWishList()}>
            Lista de desejos
          </Button>,
          <Button danger key="close" type="default" loading={false} onClick={() => setIsModalVisible(false)}>
            Fechar
          </Button>,
          <Button
            key="goTo"
            loading={false}
            onClick={() => {
              setIsModalVisible(false)
              window.scrollTo(0, 0)
              navigate(`/produto/${data.id}`, { state: { data: data } })
            }}
          >
            Ir para página de produto
          </Button>,
        ]}
      >
        <ProductDetails data={data} />
      </Modal>

      <Card
        hoverable
        style={{ width: 240, marginBottom: 30 }}
        cover={<img onClick={() => setIsModalVisible(true)} style={{ height: 300, width: "100%" }} alt="example" src={data.images[0] ? data.images[0] : 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'} />}
        actions={[
          <HeartTwoTone
            twoToneColor={InWishListColor}
            onClick={() => addToWishList()}
            style={{
              fontSize: 20
            }}
            label="lista de desejos" />
        ]}
      >
        <div onClick={() => setIsModalVisible(true)}>
          <Meta title={data.name} description={elipses()} />
          <Meta title={data.price} description={""} />
        </div>
      </Card>
    </React.Fragment>
  )
}