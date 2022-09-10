import 'react-credit-cards/es/styles-compiled.css';
import React from 'react'
import {
  Row,
  Col,
  Space,
  Button,
  Form,
  Input,
  Typography,
  Tabs
} from 'antd'

import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom'

import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
// import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
// import images from 'react-payment-inputs/images';
import Cards from 'react-credit-cards';

import {
  useProductContext,
  useAuthContext
} from '../../context'

import {
  ProductDetails
} from '../../components'

import {
  useWindowDimensions
} from '../../hooks/useWindownDimension'

import {
  paths
} from '../../mocks/paths'

interface IProductFeatures {
  title: string
  body: {
    [x: string]: string
  }
}

interface IUseProductCheckout {
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
  co_product_stocks: string
  co_product_id: string,
  co_quantity: number
}

interface props { }

export const Checkout: React.FC<props> = ({ }) => {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useAuthContext()
  const productContext = useProductContext()
  const { width } = useWindowDimensions()
  const { Title, Text } = Typography

  //@ts-ignore
  const [productdata, setProductData] = React.useState<IUseProductCheckout>(location.state?.data)
  const [cvc, setCvc] = React.useState<string>('')
  const [expiry, setExpiry] = React.useState<string>('')
  const [focused, setFocused] = React.useState<any>()
  const [number, setNumber] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')

  const [form] = Form.useForm();

  // To disable submit button at the beginning.
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };


  React.useEffect(() => {
    const initialize = async () => {
      //@ts-ignore
      if (!location.state?.data && !params.id) {
        navigate(paths.myPurchases)
      }

      if (!authContext.user) {
        navigate(paths.home)
      }
      if (!params.id) {
        navigate(paths.home)
      }
      //@ts-ignore
      console.log(location.state.data)
    }
    initialize()
  }, [])

  const checkoutTabItems = [
    {
      label: `Seu carrinho`,
      key: "cart",
      children:
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Col span={18}>
            <ProductDetails
              isComplete
              data={{
                id: productdata.co_product_id,
                name: productdata.co_product_name,
                price: productdata.co_product_price,
                description: productdata.co_product_description,
                categories: productdata.co_product_categories,
                mainCategories: productdata.co_product_main_categories,
                installments: productdata.co_product_installments,
                images: productdata.co_product_images,
                discount: productdata.co_product_discount,
                marc: productdata.co_product_marc,
                conditions: productdata.co_product_discount,
                features: productdata.co_product_features,
                isActive: productdata.co_is_product_active,
                seller: productdata.co_product_seller,
                stocks: +productdata.co_product_stocks
              }}
            />
          </Col>
        </Row>
    },
    {

      label: `Pagamento`,
      key: "payment",
      children: (
        <React.Fragment>
          <Row style={{ justifyContent: "center", alignItems: "center", marginTop: 45 }}>
            <Title level={4}>
              você está adiquirindo {productdata.co_quantity}
              unidades de {productdata.co_product_name} ao custo
              de R$ {+productdata.co_product_price * productdata.co_quantity} -
              preço unitário R${+productdata.co_product_price}
            </Title>
          </Row>

          <Row style={{ marginTop: 45, alignItems: "center", justifyContent: "center" }}>

            <div
              style={{
                marginRight: width > 420 ? 30 : 0,
                display: "flex",
                flexDirection: width > 420 ? "row" : "column",
                justifyContent: "space-between",
                marginLeft: width > 420 ? 30 : 0,
              }}
            >

              <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focused}
                name={name}
                number={number}
                placeholders={{ name: "nome do cartão" }}
                issuer="visa"
              />


              <Form
                style={{
                  marginTop: width > 420 ? 0 : 20,
                  marginRight: width > 420 ? 30 : 0,
                  marginLeft: width > 420 ? 30 : 0
                }}
                form={form}
                name="horizontal_login"
                layout="horizontal"
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      Log in
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </Row>
        </React.Fragment>
      ),
    }

  ]


  return (
    <React.Fragment>
      <Tabs centered>
        {
          checkoutTabItems.map((values, index) => (
            <Tabs.TabPane key={index} tab={values.label}>
              {
                values.children
              }
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </React.Fragment>
  )
}