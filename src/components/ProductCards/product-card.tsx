import React from "react";
import { useProductContext, useAuthContext } from "../../context";
import { Card, Modal, Button, message, Tooltip } from "antd";
import { ShoppingTwoTone, HeartTwoTone } from "@ant-design/icons";
import { ProductDetails } from "..";
import { useNavigate } from "react-router-dom";

type IProductFeatures = {
  title: string;
  body: {
    [x: string]: any;
  };
};

type IProduct = {
  id: string;
  name: string;
  price: string;
  description: string;
  categories: string[];
  mainCategories: string;
  installments: string;
  images: string[];
  discount: string;
  marc: string;
  conditions: string;
  features: IProductFeatures[];
  isActive: boolean;
  seller: string;
  stocks: number;
};

type props = {
  data: IProduct;
  wishListButton?: boolean;
};

export const ProductCards: React.FC<props> = ({ data, wishListButton }) => {
  // const { width } = useWindowDimensions()
  const { Meta } = Card;
  const productContext = useProductContext();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {}, [productContext.wishList]);

  const addToWishList = async () => {
    try {
      await productContext.addToWishList(
        data?.id || "",
        authContext.user?.access_token || ""
      );
      message.success("adicionado a sua lista de desejos!");
      return;
    } catch (error) {
      message.success("erro ao concluir ação");
      return;
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await productContext.removeFromWishlist(
        data?.id || "",
        authContext.user?.access_token || ""
      );
      message.warn("removido da sua lista de desejos!");
      return;
    } catch (error) {
      message.success("erro ao concluir ação");
      return;
    }
  };

  const elipses = (): string => {
    if (data.description.length > 27) {
      return data.description.slice(0, 24) + "...";
    }
    return data.description;
  };
  return (
    <React.Fragment>
      <Modal
        title={data.name.toUpperCase()}
        centered
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={850}
        style={{ padding: 0 }}
        footer={[
          <Button
            danger={productContext.wishList.includes(data.id)}
            icon={
              <ShoppingTwoTone
                twoToneColor={
                  !productContext.wishList.includes(data.id) ? "blue" : "red"
                }
              />
            }
            key="addToWishList"
            onClick={() =>
              !productContext.wishList.includes(data.id)
                ? addToWishList()
                : removeFromWishlist()
            }
          >
            {!productContext.wishList.includes(data.id)
              ? "lista de desejos"
              : "remover dos desejos"}
          </Button>,
          <Button
            danger
            key="close"
            type="default"
            loading={false}
            onClick={() => setIsModalVisible(false)}
          >
            Fechar
          </Button>,
          <Button
            key="goTo"
            loading={false}
            onClick={() => {
              setIsModalVisible(false);
              window.scrollTo(0, 0);
              navigate(`/produto/${data.id}`, { state: { data: data } });
            }}
          >
            Ir para página de produto
          </Button>,
        ]}
      >
        <ProductDetails data={data} wishListButton={wishListButton} />
      </Modal>

      <Card
        hoverable
        style={{ width: 240, marginBottom: 30 }}
        cover={
          <img
            onClick={() => setIsModalVisible(true)}
            style={{ height: 300, width: "100%" }}
            alt="example"
            src={
              data.images[0]
                ? data.images[0]
                : "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
            }
          />
        }
        actions={[
          <Tooltip
            placement="top"
            title={
              productContext.wishList.includes(data.id)
                ? "clique para remover da lista de desejos"
                : "Clique para adicionar a lista de desejos"
            }
          >
            <HeartTwoTone
              twoToneColor={
                productContext.wishList.includes(data.id) ? "red" : "blue"
              }
              onClick={() =>
                !productContext.wishList.includes(data.id)
                  ? addToWishList()
                  : removeFromWishlist()
              }
              style={{
                fontSize: 20,
              }}
              label="lista de desejos"
            />
          </Tooltip>,
        ]}
      >
        <div onClick={() => setIsModalVisible(true)}>
          <Meta title={data.name} description={elipses()} />
          <Meta title={data.price} description={""} />
        </div>
      </Card>
    </React.Fragment>
  );
};
