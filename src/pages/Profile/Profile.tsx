import {
  AppstoreOutlined,
  PieChartOutlined,
  TeamOutlined,
  OrderedListOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { MenuProps, message } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import * as Profile from "./Components";
const { Content, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Minhas compras", "1", <PieChartOutlined />),
  getItem("Minha lista de desejos", "2", <AppstoreOutlined />),
  getItem("Meus anúncios", "sub1", <OrderedListOutlined />, [
    getItem("Todos", "3"),
    getItem("Categorias", "4"),
    getItem("Dashboard", "5"),
  ]),
  getItem("Meus dados", "sub2", <TeamOutlined />),
  getItem("Alterar senha", "9", <SafetyOutlined />),
];

type MenuItem = Required<MenuProps>["items"][number];

export default function MyProfile() {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<React.ReactNode>(
    <Profile.MyPurchases />
  );

  const changeContent = (e: MenuItem) => {
    if (e?.key === "1") {
      setContent(<Profile.MyPurchases />);
    } else if (e?.key === "2") {
      setContent(<Profile.MyWishList />);
    } else {
      message.warn("Em desenvolvimento", 3);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          onClick={(e) => changeContent(e)}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
            {content}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
