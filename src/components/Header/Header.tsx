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
  PlusCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import {
  Menu,
  Typography,
  Modal,
  Button,
  Badge,
  message,
  Row
} from 'antd';
import { useAuthContext, useProductContext } from '../../context'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'
import { ListAdressAndSelect } from '../../components/ListAdressAndSelect'
import { TAdressForm, FormEditAdress } from '../../components'
import { notification } from './Mocks/notification.mock'
import { questions } from './Mocks/questions.mock'
interface props { }


export const Header: React.FC<props> = () => {
  const navigate = useNavigate()
  const { Text } = Typography
  const authContext = useAuthContext()
  const productContext = useProductContext()
  const [numberInBadge, setNumberInBadge] = React.useState<number>(0)

  //relations with auth context
  React.useEffect(() => {
    const initialize = async () => {
      //do something
    }
    initialize()
  }, [authContext.user, authContext.userAdress, authContext.userListAdress])

  //elations with product context
  React.useEffect(() => {

  }, [productContext.cartIds])


  const [visible, setVisible] = React.useState<boolean>(false);
  const [visibleEditAdressModal, setVisibleEditAdressModal] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState(false);

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

        <Menu.Item key="home" icon={<HomeOutlined width={30} />}>
          <Text >Home</Text>
        </Menu.Item>

        {/* <Row style={{ display: "flex", flex: 1, justifyContent: "right" }}> */}
        <Menu.Item onClick={() => setVisible(true)} key="adress" icon={<EnvironmentOutlined />}>
          <Text ellipsis={true}>{authContext.userAdress?.street || "Endereço"}</Text>
        </Menu.Item>

        <Menu.Item onClick={() => navigate(paths.myPurchases)} key="buyes" icon={<ShoppingCartOutlined />}>
          <Text>
            <Badge count={productContext.cartIds.length} overflowCount={10} size="default">
              Compras
            </Badge>
          </Text>
        </Menu.Item>

        <Menu.SubMenu key="questions-1" title="perguntas" icon={<QuestionCircleOutlined />}>
          <React.Fragment>
            <Menu.Item
              style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}
              key="11-questions"
            >
              <Text type="danger">Ilustração</Text>
            </Menu.Item>
            {
              questions.map((values, index) => (
                <Menu.Item
                  style={{ maxWidth: 300 }}
                  key={`${index}-1${index}-questions`}
                  icon={
                    <Badge size="default">
                      <QuestionCircleOutlined />
                    </Badge>
                  }
                >
                  <Text>{values.body}</Text>
                </Menu.Item>
              ))
            }
            <Menu.Item
              style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}
              key="15-questions"
            >
              <Button onClick={() => message.success("indo para todas as perguntas")} type="primary">Ir para todas</Button>
            </Menu.Item>
          </React.Fragment>
        </Menu.SubMenu>

        <Menu.SubMenu key="10-Notificações" title="Notificações" icon={<BellOutlined />}>
          <React.Fragment>
            <Menu.Item
              style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}
              key="11-Notificações"
            >
              <Text type="danger">Ilustração</Text>
            </Menu.Item>
            {
              notification.map((values, index) => (
                <Menu.Item
                  style={{ maxWidth: 300 }}
                  key={`${index}-1${index}-Notificações`}
                  icon={
                    <Badge size="default">
                      <BellOutlined />
                    </Badge>
                  }
                >
                  <Text>{values.body}</Text>
                </Menu.Item>
              ))
            }

            <Menu.Item
              style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}
              key="15-Notificações"
            >
              <Button onClick={() => message.success("indo para todas as notificações")} type="primary">Ir para todas</Button>
            </Menu.Item>
          </React.Fragment>
        </Menu.SubMenu>

        {/* <Menu.Item key="notify-1" icon={<BellOutlined />}>
          <Text>Notificações</Text>
        </Menu.Item> */}

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
                <Badge count={productContext.wishList.length} overflowCount={10} size="default">
                  <Text>Lista de desejos</Text>
                </Badge>
              </Menu.Item>

              <Menu.Item onClick={() => navigate(paths.myPurchases)} key="2-Compras" icon={<AppstoreOutlined />}>
                <Text>compras</Text>
              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup title="Perfil">

              <Menu.Item onClick={() => setOpen(true)} key="1-Perfil" icon={<ProfileOutlined />}>
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
        {/* </Row> */}


      </Menu>
    </React.Fragment >
  )
}
