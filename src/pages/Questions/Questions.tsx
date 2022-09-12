
import {
  Avatar,
  Button,
  Col,
  List,
  Skeleton,
  Typography,
  Row
} from 'antd';
import React, { useEffect, useState } from 'react';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function Questions({ }) {
  const { Text, Title } = Typography
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Carregar mais</Button>
      </div>
    ) : null;

  return (
    <React.Fragment>
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>

        <Col md={18} >
          <Row style={{ justifyContent: "center", marginTop: 30 }}>
            <Title>Perguntas</Title><br />
          </Row>
          <Row style={{ justifyContent: "center", marginBottom: 30 }}>
            <Text type="danger" style={{ fontSize: 15, fontWeight: "600" }}>em desenvolvimento...</Text>
          </Row>
          <List
            className="min-height: 350px;"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                actions={[<Button type="primary">Marcar como lido</Button>, <Button key="list-loadmore-more">Fixar</Button>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<Title level={5}>{item.name?.last}</Title>}
                    description={<Text style={{ fontSize: 15 }}>Implementar função de perguntas</Text>}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </div>
    </React.Fragment >
  );
};
