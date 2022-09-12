import React from "react";
import { Result, Button, Space, Typography } from "antd";
import { BsTruck } from "react-icons/bs";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { paths } from "../../mocks/paths";

interface props {}

export default function SucefullyPurchase({}) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const { Title, Text } = Typography;

  React.useEffect(() => {
    const initialize = async () => {
      //@ts-ignore
      if ((!location.state.id as any) || !params.id) {
        navigate(paths.myPurchases);
      }
    };
    initialize();
    //@ts-ignore
  }, [location.state.id]);

  return (
    <React.Fragment>
      <Result
        icon={<BsTruck size={300} />}
        status="success"
        title="Compra finalizada com sucesso"
        // subTitle="Agora é só esperar"
        subTitle={
          <React.Fragment>
            <Text>Agora é só esperar</Text> <br />
            <Text>
              Será entregue em {authContext.userAdress?.city}, cep:{" "}
              {authContext.userAdress?.zipCode}
            </Text>
            <br />
          </React.Fragment>
        }
        extra={[
          <Space>
            <Button onClick={() => navigate(paths.home)} key="home">
              Voltar para o inicio
            </Button>
            <Button
              onClick={() => navigate(paths.myPurchases)}
              type="primary"
              key="buy"
            >
              Continuar comprando
            </Button>
          </Space>,
        ]}
      />
    </React.Fragment>
  );
}
