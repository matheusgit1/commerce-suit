import { Button, Descriptions, PageHeader, Statistic, Tabs, Typography, Space } from 'antd';
import React from 'react';
import { GoLocation } from 'react-icons/go'
import { AiOutlineShopping } from 'react-icons/ai'
import { useWindowDimensions } from '../../hooks/useWindownDimension'

const { TabPane } = Tabs;
const { Text } = Typography



export const Header: React.FC = () => {
  const { width } = useWindowDimensions()

  const Content: React.FC<{ children: React.ReactNode; extra: React.ReactNode }> = ({
    children,
    extra,
  }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );


  const extraContent = (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        justifyContent: 'flex-end',
      }}
    >
      <Statistic
        title="Status"
        value="Pending"
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Price" prefix="$" value={568.08} />
    </div>
  );


  const renderContent = (column = 1) => (
    <Descriptions style={{}} size="small" column={column}>

      <Descriptions.Item prefixCls='prefix' label="Enviar para:  ">
        <Space>
          <>
            <GoLocation color={"#000"} size={15} /><Text >Endereço atual</Text>
          </>
          <>
            <AiOutlineShopping color={"#000"} size={15} /> Lista de desejos
          </>
        </Space>
      </Descriptions.Item>

      {/* <Descriptions.Item label="Lista de desejos: ">
      
    </Descriptions.Item> */}

      {/* <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="Remarks">
      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item> */}
    </Descriptions>
  );


  return (
    <React.Fragment>
      <PageHeader
        style={{ marginBottom: 45, background: "#b3b3b3", position: "fixed", zIndex: 5 }}
        // onBack={() => window.history.back()}
        title="Commerce-Suit"
        // subTitle="This is a subtitle"
        extra={[
          <Button key="3">Operation</Button>,
          // <Button key="2">Operation</Button>,
          // <Button key="1" type="primary">
          //   Primary
          // </Button>,
        ]}
      // footer={
      //   <Tabs defaultActiveKey="1">
      //     <TabPane tab="Details" key="1" />
      //     <TabPane tab="Rule" key="2" />
      //   </Tabs>
      // }
      >
        <Content
          extra={<></>}
        >
          {renderContent()}
        </Content >
      </PageHeader >
    </React.Fragment>
  )
}
