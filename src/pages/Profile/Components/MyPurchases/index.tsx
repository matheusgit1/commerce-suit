import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

import { Avatar, List, Space, Typography, message } from "antd";
import moment from "moment-timezone";
import {
  ProductContext,
  useAuthContext,
  useProductContext,
} from "../../../../context";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface props {}

interface IProductFeatures {
  title: string;
  body: {
    [x: string]: string;
  };
}

interface IPurchaseList {
  id?: string;
  co_product_name?: string;
  co_product_price?: string | number;
  co_product_description?: string;
  co_product_categories?: string[];
  co_product_main_categories?: string;
  co_product_installments?: string | number;
  co_product_images: string[];
  co_user_id?: string;
  co_product_discount?: string | number;
  co_product_marc?: string;
  co_product_conditions?: string;
  co_product_features?: IProductFeatures[];
  co_product_seller?: string;
  co_five_stars?: number | null;
  co_four_stars?: number | null;
  co_three_stars?: number | null;
  co_two_stars?: number | null;
  co_one_stars?: number | null;
  co_zero_stars?: string;
  co_created_at: Date;
  co_updated_at: Date;
  co_product_seller_id?: string;
  co_produdct_installment_price?: string | number;
  co_product_id?: string;
  co_purchase_total?: string | number;
  co_purchase_amount?: string | number;
}

export const MyPurchases: React.FC<props> = ({}) => {
  const { Text, Title } = Typography;
  const productContext = useProductContext();
  const authContext = useAuthContext();

  const [purchaseList, setPurchaseList] = React.useState<IPurchaseList[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        console.log(authContext.user?.access_token);
        const { data } = await productContext.listPurchase(
          0,
          authContext.user?.access_token
        );
        setPurchaseList(data);
        setLoading(false);
        return;
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        message.error("Erro ao listar suas compras");
        return;
      }
    };
    initialize();
  }, []);

  return (
    <React.Fragment>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={purchaseList}
        renderItem={(item) => (
          <List.Item
            style={{ marginTop: 5 }}
            key={item.id}
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
            extra={
              <img
                width={272}
                height={272}
                alt="image"
                src={item?.co_product_images[0]}
              />
            }
          >
            <List.Item.Meta
              title={item.co_product_name}
              description={item.co_product_description}
            />
            <>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Unidades:{" "}
              </Text>
              {item?.co_purchase_amount}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Vendendor:{" "}
              </Text>
              {item?.co_product_seller}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Total:{" "}
              </Text>{" "}
              R${item?.co_purchase_total}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Descrição do produto:{" "}
              </Text>{" "}
              R${item?.co_product_description}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Parcelas:{" "}
              </Text>
              {item?.co_product_installments}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Discont:{" "}
              </Text>{" "}
              R${item?.co_product_discount}
              <br />
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                compra feita em:{" "}
              </Text>
              {new Date(
                moment(new Date(item?.co_created_at))
                  .tz("America/Sao_Paulo")
                  .format()
              ).toLocaleDateString()}
            </>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};
