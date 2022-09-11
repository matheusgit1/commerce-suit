import React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Row, Select } from 'antd';
import {
  IAdressFormat
} from '../../services'
import { useAuthContext } from '../../context'

type RequiredMark = boolean | 'optional';
export type TAdressForm = "edit" | "create"

interface props {
  data?: IAdressFormat
  type: TAdressForm
}

export const FormEditAdress: React.FC<props> = ({ data, type }) => {
  const authContext = useAuthContext()

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false)

  const [street, setStreet] = React.useState<string>(data?.street || '')
  const [city, setCity] = React.useState<string>(data?.city || '')
  const [zipCode, setZipCode] = React.useState<string>(data?.zipCode || '')
  const [district, setDistrict] = React.useState<string>(data?.district || '')
  const [number, setNumber] = React.useState<number | undefined>(data?.number || undefined)
  const [state, setSate] = React.useState<string>(data?.state || '')
  const [uf, setUf] = React.useState<string>(data?.uf || '')
  const [reference, setReference] = React.useState<string>(data?.reference || '')
  const [block, setBlock] = React.useState<string>(data?.block || '')
  const [userId, setUserId] = React.useState<string>(data?.userId || '')

  const listUf = [
    'AC',
    'AP',
    'AL',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ]

  React.useEffect(() => {
    const initialize = () => {
      switch (type) {
        case "edit":
          setZipCode(data?.zipCode || '')
          setCity(data?.city || '')
          setUserId(data?.userId || '')
          setStreet(data?.street || '')
          setDistrict(data?.district || '')
          setNumber(data?.number)
          setBlock(data?.block || '')
          setSate(data?.state || '')
          setUf(data?.uf || '')
          setReference(data?.reference || '')
          break;
        case "create":
          setZipCode('')
          setCity('')
          setUserId('')
          setStreet('')
          setDistrict('')
          setNumber(undefined)
          setBlock('')
          setSate('')
          setUf('')
          setReference('')
          break
        default:
          throw new Error(`${type} is not assigned type of AdressForm`)
      }

    }
    initialize()
  }, [data])

  const createAdress = async () => {

    try {
      const response = await authContext.registerANewAdressOfUser({
        city: city,
        street: street,
        district: district,
        zipCode: zipCode,
        number: number || 0,
        block: block.toString(),
        state: state,
        uf: uf,
        reference: reference,
      }, authContext.user?.access_token)
      message.success("Endereço criado")
      return
    } catch (error: any) {
      message.error("erro ao criar endereço")
      return
    }
  }

  const editAdress = async () => {
    try {
      setLoading(true)

      const response = await authContext.updateUserAdress({
        city: city,
        street: street,
        district: district,
        zipCode: zipCode,
        number: number || 0,
        block: block.toString(),
        state: state,
        uf: uf,
        reference: reference,
        adressId: data?.id || ''
      }, { 'Authorization': `Bearer ${authContext.user?.access_token}` })

      authContext.userListAdress?.map((values, index) => {
        if (values.id === data?.id) {
          values = data
        }
      })
      message.success("Endereço atualizado com sucesso")

      setLoading(false)
    } catch (error: any) {
      console.error("erro: ", error)
      setLoading(false)
      // if (error.response.data.erro) {
      //   message.error(error.response.data.erro || error.response.data.message)
      //   return
      // }
      message.error("Erro interno")
      return
    }
  };

  const onFinishFailed = (errorInfo: any) => {

  };


  return (
    <React.Fragment>
      <Form
        name="edit-adress-form"
        // form={form}
        layout="vertical"
        onFinish={(e) => { type === "edit" ? editAdress() : createAdress() }}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nome da rua"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="rua" value={street} onChange={(e) => setStreet(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Quadra"
          required={false}
          tooltip={{ title: 'este campo é opcional!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="quadra" value={block} onChange={(e) => setBlock(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Referência"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="referencia" value={reference} onChange={(e) => setReference(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Número"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >

          <Input required type="number" placeholder="numero" value={number} onChange={(e) => setNumber(+e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Cidade"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="cidade" value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Bairro"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="bairro" value={district} onChange={(e) => setDistrict(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="CEP"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="cep" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Estado"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Input required placeholder="estado" value={state} onChange={(e) => setSate(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="UF"
          required={true}
          tooltip={{ title: 'este campo é obrigatório!', icon: <InfoCircleOutlined /> }}
          rules={[
            {
              message: 'este campo é obrigatório!',
            },
          ]}
        >
          <Select placeholder="uf" value={uf} onChange={(e) => setUf(e)}>
            {
              listUf.map((values, index) => (
                <Select.Option key={index} value={values}>{values}</Select.Option>
              ))
            }

          </Select>
        </Form.Item>



        <Row style={{ justifyContent: "flex-end" }}>
          <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              {
                type == "edit" ? loading ? 'Atualizando' : 'Atualizar' : loading ? "Criando" : "Criar"
              }
            </Button>
          </Form.Item>
        </Row>

      </Form>
    </React.Fragment>
  )
}