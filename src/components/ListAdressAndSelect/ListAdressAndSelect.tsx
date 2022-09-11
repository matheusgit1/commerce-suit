import React from 'react'
import {
  Card,
  Typography,
  Button,
  Modal,
  Col,
  Form,
  Space,
  message
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
import { useAuthContext } from '../../context'
import { FormEditAdress, TAdressForm } from '../../components'
import {
  IAdressFormat
} from '../../services'

interface props {
  buttonAddNewAdress?: boolean
}

export const ListAdressAndSelect: React.FC<props> = ({ buttonAddNewAdress }) => {

  const authContext = useAuthContext()
  const { Meta } = Card
  const { Title, Link, Text } = Typography
  const { width } = useWindowDimensions()


  const [visibleEditAdressModal, setVisibleEditAdressModal] = React.useState<boolean>(false)
  const [modalData, setModalData] = React.useState<IAdressFormat | undefined>(authContext.userAdress)
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false)
  const [typeModalAdress, setTypeModalAdres] = React.useState<TAdressForm>("edit")

  React.useEffect(() => {
    //list adress
    const initialize = async () => {

    }
    initialize()
  }, [authContext.userListAdress, authContext.userAdress])

  const deleteAdress = async (adressId: string) => {
    try {
      setLoading(true)
      const { status } = await authContext.deleteUserAdress({ adressId: adressId }, { 'Authorization': `Bearer ${authContext.user?.access_token}` })
      authContext.removeAdressFromList(adressId)
      message.warn("Endereço deletado")
      setLoading(false)
      return
    } catch (error: any) {
      console.error("erro: ", error)
      setLoading(false)
      if (error.response.data.erro) {
        message.error(error.response.data.erro || error.response.data.message)
        return
      }
      message.error("Erro interno")
      return
    }
  }


  return (
    <React.Fragment>
      {/* modal to edit an existing adress */}
      <Modal
        title={`${typeModalAdress == "edit" ? "Editando" : "Criando endereço"} ${typeModalAdress == "edit" ? modalData?.street : ""}`}
        centered
        visible={visibleEditAdressModal}
        onOk={() => setVisibleEditAdressModal(false)}
        onCancel={() => setVisibleEditAdressModal(false)}
        width={450}
        footer={null}
      >
        <FormEditAdress type={typeModalAdress} key={modalData?.id} data={modalData} />
      </Modal>

      {/* modal to edit an existing adress */}
      {
        authContext.userListAdress?.length === 0 ? (
          <Card
            key="no-one"
            hoverable
            style={{ marginTop: 8 }}
            loading={false}
            actions={[
              <Button
                onClick={() => {
                  setTypeModalAdres("create")
                  setVisibleEditAdressModal(true)
                }}
                loading={loading}
                type="primary"
                icon={<PlusCircleOutlined />}
              >
                Adicionar
              </Button>,
            ]}
          >
            <Meta
              avatar={width > 400 && <BsTruck style={{ fontSize: 45 }} />}
              title={
                <>
                  <Text style={{ justifyContent: "center" }}>
                    Vôcê não tem endereço<br />cadastrado ainda
                  </Text>
                </>
              }
            />
          </Card>
        ) : (
          authContext.userListAdress?.map((values, index) => (
            <Card
              style={{ marginTop: 8, boxShadow: values.id === authContext.userAdress?.id ? 'rgba(26, 222, 4, 0.979) 0px 3px 8px' : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
              hoverable
              key={index + values.id}
              loading={false}
              actions={[
                <Col>
                  {
                    width > 400 && (
                      <Button
                        onClick={() => {
                          authContext.createUserAdress(values)
                          message.success("Novo endereço padrão selecionado")
                        }}
                        style={{
                          color: authContext.userAdress?.id === values.id ? 'white' : 'blue',
                          background: authContext.userAdress?.id === values.id ? '#7cf601' : 'white'
                        }}
                        type="default"
                        icon={<CheckOutlined />}
                      >
                        {
                          authContext.userAdress?.id === values.id ? 'Selecionado' : 'selecionar'
                        }
                      </Button>
                    )
                  }
                  ,
                  <Button
                    loading={loading}
                    onClick={() => {
                      setTypeModalAdres("edit")
                      setModalData(values)
                      setVisibleEditAdressModal(true)
                    }
                    }
                    type="primary"
                    icon={<EditOutlined />}
                  >
                    Editar
                  </Button>,
                  <Button
                    onClick={() => deleteAdress(values.id)}
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Excluir
                  </Button>,
                  <Button
                    type="primary"
                    // onClick={() => }
                    onClick={() => {
                      setTypeModalAdres("create")
                      setModalData(undefined)
                      setVisibleEditAdressModal(true)
                    }}
                    icon={<PlusCircleOutlined />}
                    style={{ visibility: buttonAddNewAdress ? "visible" : "hidden" }}
                  >
                    Adicionar
                  </Button>

                </Col>
              ]}
            >
              <div onClick={() => {
                authContext.createUserAdress(values)
                message.success("Novo endereço padrão selecionado")
              }}
              >
                <Meta
                  avatar={width > 400 && <BsTruck style={{ fontSize: 45 }} />}
                  title={
                    <>
                      <Title level={4}>{values.street}</Title>
                      <Title type="secondary" level={5}>
                        Cep: {values.zipCode}
                      </Title>
                    </>

                  }
                  description={<>
                    <Text type="secondary">
                      Cidade: {values.city}
                    </Text><br />
                    <Text type="secondary">
                      Número: {values.number}
                    </Text><br />
                    <Text type="secondary">
                      Bairro: {values.district}
                    </Text><br />
                    <Text type="secondary">
                      Quadra: {values.block || "Não definido"}
                    </Text><br />
                    <Text type="secondary">
                      UF: {values.uf}
                    </Text><br />
                    {/* <Text type="secondary">
                      Id: {values.id}
                    </Text><br /> */}
                  </>
                  }
                />
              </div>
            </Card>
          ))
        )
      }

    </React.Fragment>
  )
}