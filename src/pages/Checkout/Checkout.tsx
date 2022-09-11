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
  Tabs,
  message,
  Result,
  Modal
} from 'antd'

import {
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom'

import {
  LockOutlined,
  UserOutlined,
  CreditCardOutlined,
  MinusOutlined,
  PlusOutlined,
  UpSquareOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
// import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
// import images from 'react-payment-inputs/images';
import Cards from 'react-credit-cards';

import { BsTruck } from 'react-icons/bs'

import {
  useProductContext,
  useAuthContext
} from '../../context'

import {
  ProductDetails,
  ProductFeatures,
  FormEditAdress,
  ListAdressAndSelect,
  TAdressForm
} from '../../components'

import {
  IAdressFormat
} from '../../services'

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

export default function Checkout({ }) {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useAuthContext()
  const productContext = useProductContext()
  const { width } = useWindowDimensions()
  const { Title, Text } = Typography

  const [activeTab, setActiveTab] = React.useState<'cart' | 'payment' | 'adress'>('cart')

  //@ts-ignore
  const [productdata, setProductData] = React.useState<IUseProductCheckout>(location.state?.data)
  const [cvc, setCvc] = React.useState<string>('')
  const [expiry, setExpiry] = React.useState<string>('')
  const [focused, setFocused] = React.useState<any>()
  const [number, setNumber] = React.useState<string>('')
  const [name, setName] = React.useState<string>('')
  const [installments, setInstallments] = React.useState<number>(1)
  const [finishLoading, setFinishLoading] = React.useState<boolean>(false)
  const [updateLoading, setUpdateLoading] = React.useState<boolean>(false)
  const [quantityInCart, setQuantityInCart] = React.useState<number>(productdata?.co_quantity || 0)

  const [form] = Form.useForm();

  const [visibleEditAdressModal, setVisibleEditAdressModal] = React.useState<boolean>(false)
  const [modalData, setModalData] = React.useState<IAdressFormat | undefined>(authContext.userAdress)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [typeModalAdress, setTypeModalAdres] = React.useState<TAdressForm>("edit")
  const [visible, setVisible] = React.useState<boolean>(false);

  // To disable submit button at the beginning.
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    forceUpdate({});
  }, []);

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
    }
    initialize()
  }, [])

  const onFinish = async (values: any) => {
    try {
      setFinishLoading(true)
      const response = await productContext.createPurchase({
        productId: productdata?.co_product_id,
        installments: installments,
        amount: 1,
        adressId: authContext.userAdress?.id || '',
        creditCard: String(values.creditCard),
        mouth: +values.mouth,
        expYear: values.expYear || new Date().getFullYear(),
        cvc: +values.cvc
      }, authContext.user?.access_token)

      message.success("Compra efetivada com sucesso")
      productContext.removeIdFromCartIds(productdata.co_product_id)
      setFinishLoading(false)

      navigate(`/minhas-compras/checkout/${params.id}/finalizado`, { state: { id: productdata.id } })
    } catch (error: any) {
      setFinishLoading(false)
      console.error("erro: ", error)
      if (Array.isArray(error.response.data.message)) {
        message.error(error.response.data.message[0])
        return
      }
      if (!Array.isArray(error.response.data.message) || error.response.data.erro) {
        message.error(error.response.data.message || error.response.data.erro)
        return
      }
      console.error("erro: ", error)
      message.error("erro ao finalizar compra")
    }

  };

  const updateCart = async () => {
    try {
      setUpdateLoading(true)
      const response = await productContext.updateCart(productdata.co_product_id, quantityInCart, authContext.user?.access_token)
      message.success("Carrinho atualizado")
      setProductData({ ...productdata, co_product_stocks: String(quantityInCart) })
      setUpdateLoading(false)
    } catch (error: any) {
      setUpdateLoading(false)
      console.error("erro: ", error)
      if (Array.isArray(error.response.data.message)) {
        message.error(error.response.data.message[0])
        return
      }
      if (!Array.isArray(error.response.data.message) || error.response.data.erro) {
        message.error(error.response.data.message || error.response.data.erro)
        return
      }
      console.error("erro: ", error)
      message.error("erro ao finalizar compra")
    }
  }


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
            <Row style={{ justifyContent: "flex-end", marginTop: 15 }}>
              <Space>
                <Input
                  addonBefore={<MinusOutlined onClick={() => setQuantityInCart(quantityInCart > 0 ? quantityInCart - 1 : 0)} />}
                  addonAfter={
                    <>
                      <Space>
                        <PlusOutlined style={{ marginRight: 10 }} onClick={() => setQuantityInCart(quantityInCart + 1)} />
                        <UpSquareOutlined disabled={updateLoading} onClick={() => updateCart()} />
                      </Space>
                    </>
                  }
                  value={quantityInCart}
                  contentEditable={false}

                />
                <Button onClick={() => setActiveTab("adress")} type="primary">ir para endereços</Button>
                <Button onClick={() => setActiveTab("payment")} type="primary">finalizar compra</Button>
              </Space>
            </Row>
            <ProductFeatures data={productdata.co_product_features} />
          </Col>
        </Row>
    },
    {
      label: "Seu endereço",
      key: "adress",
      children: (
        <React.Fragment>
          <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center" }}>
            <Col span={18}>
              <ListAdressAndSelect buttonAddNewAdress={true} />
              <Modal
                title={`Criando endereço`}
                centered
                visible={visibleEditAdressModal}
                onOk={() => setVisibleEditAdressModal(false)}
                onCancel={() => setVisibleEditAdressModal(false)}
                width={450}
                footer={null}
              >
                <FormEditAdress key="create" type="create" />
              </Modal>
              <Row style={{ justifyContent: "flex-end", marginTop: 15 }}>
                <Space>
                  <Button onClick={() => setActiveTab("cart")} >voltar ao carrinho</Button>
                  <Button onClick={() => setActiveTab("payment")} type="primary">finalizar compra</Button>
                </Space>
              </Row>
            </Col>
          </div>
        </React.Fragment >
      )
    },
    {

      label: `Pagamento`,
      key: "payment",
      children: (
        <React.Fragment>
          <Row
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col span={18}>
              <Row style={{ justifyContent: "center", alignItems: "center", margin: "20px 0px" }}>
                <Title
                  level={5}
                  style={{ textAlign: "justify", maxWidth: 400 }}
                >
                  você está adiquirindo {quantityInCart}{" "}
                  unidades de {productdata.co_product_name} ao custo
                  de R$ {+productdata.co_product_price * +quantityInCart} -
                  preço unitário R${+productdata.co_product_price}
                </Title>
              </Row>

              <Row style={{ marginTop: 10, alignItems: "center", justifyContent: "center" }}>

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
                      name="creditCard"
                      tooltip="número no seu cartão de crédito"
                      rules={[{ required: true, message: 'Campo necessário' }]}
                    >
                      <Input
                        type="number"
                        onChange={(e) => setNumber(e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder="número do cartão"
                      />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: 'Nome do cartão' }]}
                    >
                      <Input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder='Nome do cartão'
                      />
                    </Form.Item>
                    <Form.Item
                      name="mouth"
                      rules={[{ required: true, message: 'Mês de validade' }]}
                    >
                      <Input
                        value={expiry}
                        type="number"
                        maxLength={2}
                        onChange={(e) => setExpiry(e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder='ano/mês de validade'
                      />
                    </Form.Item>
                    {/* <Form.Item
                      name="expYear"
                      rules={[{ required: true, message: 'Ano de validade' }]}
                    >
                      <Input
                        type="number"
                        onChange={(e) => setExpiry(e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder='Ano de validade'
                      />
                    </Form.Item> */}

                    <Form.Item
                      name="cvc"
                      rules={[{ required: true, message: 'cvc' }]}
                    >
                      <Input
                        type="number"
                        onChange={(e) => setCvc(e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder='cvc'
                      />
                    </Form.Item>

                    <Form.Item
                      name="installments"
                      rules={[{ required: false }]}
                    >
                      <Input
                        type="number"
                        value={installments}
                        onChange={(e) => setInstallments(+e.target.value)}
                        prefix={
                          <CreditCardOutlined className="site-form-item-icon" />
                        }
                        placeholder='parcelas'
                      />
                    </Form.Item>

                    <Row style={{ justifyContent: "flex-end" }}>
                      <Space>
                        <Form.Item shouldUpdate>
                          {() => (
                            <Button
                              loading={finishLoading}

                              style={{
                                background: '#3cf51e',
                                color: "#fff",
                                width: 150
                              }}
                              htmlType="submit"
                              disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                                finishLoading ||
                                updateLoading
                              }
                            >
                              Finalizar
                            </Button>
                          )}
                        </Form.Item>
                        <Form.Item>
                          <Button onClick={() => setActiveTab("cart")}>
                            voltar para o carrinho
                          </Button>
                        </Form.Item>
                      </Space>
                    </Row>

                  </Form>
                </div>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      ),
    }

  ]


  return (
    <React.Fragment>
      <Tabs onTabClick={(e: any) => setActiveTab(e)} activeKey={activeTab} draggable centered>
        {
          checkoutTabItems.map((values, index) => (
            <Tabs.TabPane key={values.key} tab={values.label}>
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