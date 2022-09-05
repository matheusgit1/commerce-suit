import React from 'react';
import {
  AppstoreOutlined,
  ShoppingOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  MailOutlined,
  ProfileOutlined,
  AlertOutlined,
  OrderedListOutlined,
  FormOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  LoginOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { Menu, Typography, Modal, Button, Badge } from 'antd';
import { useAuthContext, useProductContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'
import { ListAdressAndSelect } from '../../components/ListAdressAndSelect'
import { TAdressForm, FormEditAdress } from '../../components'

interface props { }


export const Header: React.FC<props> = () => {
  const navigate = useNavigate()
  const { Text } = Typography
  const authContext = useAuthContext()
  const productContext = useProductContext()


  //relacionados ao contexto de autenticação
  React.useEffect(() => {
    const initialize = async () => {
      //do something
    }
    initialize()
  }, [authContext.user, authContext.userAdress, authContext.userListAdress])

  //relacionados ao contexto de produtos
  React.useEffect(() => {
    const initialize = async () => {
      //do something
    }
    initialize()
  }, [productContext.cartIds])



  const [visible, setVisible] = React.useState<boolean>(false);
  const [visibleEditAdressModal, setVisibleEditAdressModal] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)


  return (
    <React.Fragment>
      <Modal
        title="Seus endereços"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={[
          <Button
            key="add-new-one"
            onClick={() => {
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
        <ListAdressAndSelect />
      </Modal>

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

      <Menu style={{ justifyContent: "flex-end" }} mode={"horizontal"}>

        <Menu.Item onClick={() => setVisible(true)} key="wish list" icon={<EnvironmentOutlined />}>
          <Text ellipsis={true}>{authContext.userAdress?.street || "Endereço"}</Text>
        </Menu.Item>

        <Menu.Item onClick={() => navigate(paths.myPurchases)} key="buyes" icon={<ShoppingCartOutlined />}>
          <Text>
            <Badge count={productContext.cartIds.length} overflowCount={10} size="default">
              Compras
            </Badge>
          </Text>
        </Menu.Item>

        <Menu.Item key="questions-1" icon={<QuestionCircleOutlined />}>
          <Text>Perguntas</Text>
        </Menu.Item>

        <Menu.Item key="notify-1" icon={<BellOutlined />}>
          <Text>Notificações</Text>
        </Menu.Item>

        {
          !authContext.user ? (
            <Menu.Item key="login-1" onClick={() => navigate(paths.login)} icon={<LoginOutlined />}>
              <Text>Login</Text>
            </Menu.Item>
          ) : <Menu.SubMenu key="user" title="USUARIO" icon={<UserOutlined />}>
            <Menu.ItemGroup title="Configurações">

              <Menu.Item key="1-Configurações" icon={<BellOutlined />}>
                <Text>Notificações</Text>
              </Menu.Item>

              <Menu.Item key="2-Configurações" icon={<MailOutlined />}>
                <Text>Emails de ofertas</Text>
              </Menu.Item>

              <Menu.Item key="3-Configurações" icon={<SettingOutlined />}>
                <Text>Gerais</Text>
              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup title="Compras">

              <Menu.Item onClick={() => navigate(paths.wishList)} key="1-Compras" icon={<AppstoreOutlined />}>
                <Text>Lista de desejos</Text>
              </Menu.Item>

              <Menu.Item key="2-Compras" icon={<AppstoreOutlined />}>
                <Text>compras</Text>
              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup title="Perfil">

              <Menu.Item key="1-Perfil" icon={<ProfileOutlined />}>
                <Text>Meu perfil</Text>
              </Menu.Item>

              <Menu.Item key="2-Perfil" icon={<AlertOutlined />}>
                <Text>Anunciar</Text>
              </Menu.Item>

              <Menu.Item key="3-Perfil" icon={<OrderedListOutlined />}>
                <Text>Meus anunicios</Text>
              </Menu.Item>

              <Menu.Item key="4-Perfil" icon={<FormOutlined />}>
                <Text>relatorios</Text>
              </Menu.Item>

              <Menu.Item key="5-logout" onClick={() => authContext.logout()} icon={<LogoutOutlined />}>
                <Text>Sair</Text>
              </Menu.Item>

            </Menu.ItemGroup>

          </Menu.SubMenu>
        }



      </Menu>
    </React.Fragment>
  )
}
