import React from "react";
// import { useWindowDimensions } from '../../hooks/useWindownDimension'
import banner from '../../assets/banners/banner.jpg'
import banner2 from '../../assets/banners/banner2.webp'
import banner3 from '../../assets/banners/banner3.webp'
import { EngineDetails, ProductCards } from '../../components'
import { useProductContext } from '../../context'
import { Carousel, Col, Divider, Row, Typography, Card, Modal, Pagination } from 'antd';
import { LockOutlined, CreditCardOutlined, PlusCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';
import ItemsCarousel from 'react-items-carousel';
// import MultiCarousel from "react-multi-carousel";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useWindowDimensions } from '../../hooks/useWindownDimension'


interface props { }



export const Home: React.FC<props> = ({ }) => {

  const productContext = useProductContext()

  const [listProduct, setListProduct] = React.useState<Array<any>>([])
  const [domestcProducts, setDomesticProducts] = React.useState<Array<any>>()
  const [modalEngineVisible, setModalEngneVisible] = React.useState<boolean>(false)
  const [activeItemIndex, setActiveItemIndex] = React.useState<number>(0);

  const [indexPagination, setIndexPagination] = React.useState<number[]>([0, 2])
  // const [listByIndex, setListByIndex] = React.useState<Array<any>>()

  const { width } = useWindowDimensions()

  //useEffect to create pagination 
  // React.useEffect(() => {
  //   const initialize = () => {
  //     for (let i = indexPagination[0]; i <= indexPagination[1]; i++) {
  //       if (listProduct[i] != (null || undefined)) {
  //         listByIndex?.push(listProduct[i])
  //       }
  //     }
  //   }
  //   return initialize()
  // }, [listProduct, indexPagination])

  //carrega lista de ultimos anuncios (genericos)
  React.useEffect(() => {
    const initialize = async () => {
      const { data } = await productContext.getListProductWithLimit()
      setListProduct(data)
      return
    }
    initialize()
  }, [])


  //listagem de produtos com categora domestico
  React.useEffect(() => {
    const initialize = async () => {
      try {
        const { data } = await productContext.getListProductByCategory({ categories: ["domestico"] })
        setDomesticProducts(data)
        return
      } catch (error: any) {
        console.log(error)
      }
    }
    initialize()
  }, [])

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    background: 'transparent', //'#e0b831',
    height: "auto",
    color: "#fff"
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const onChangeSlideCarrousel = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const { Text, Title, Link } = Typography
  const { Meta } = Card



  return (

    <React.Fragment>
      <Carousel
        autoplay style={contentStyle} afterChange={onChangeSlideCarrousel}
      >
        <img src={banner} style={contentStyle} />
        <img src={banner2} style={contentStyle} />
        <img src={banner3} style={contentStyle} />
      </Carousel>


      <Divider style={{ width: 16 }} orientation="left">
        <Title style={{ padding: "0px 0px" }}> Ultimos anúncios </Title>
      </Divider>
      <Row style={{ justifyContent: "space-around" }} >
        {
          listProduct?.map((values, index) => (
            // index > indexPagination[0] && index < indexPagination[1] ? {
            <Col key={index}>
              <ProductCards key={index} data={values} />
            </Col>
            // }
          ))
        }

      </Row>

      <Row style={{ justifyContent: "space-around", marginTop: 15, marginBottom: 15 }} >
        <Pagination onChange={(e) => setIndexPagination([2 * e - 2, 2 * e])} defaultCurrent={1} total={(listProduct.length / 2)} />
        {/* (listProduct?.length || 20) / 20 */}
      </Row>

      <Row style={{ justifyContent: "space-around" }} >
        <Card
          onClick={() => setModalEngneVisible(true)}
          hoverable
          style={{
            width: 300,
            marginTop: 16,
            borderRadius: 10,
            borderLeft: "6px solid #5b5b5b",
          }}
        >
          <Meta
            avatar={<LockOutlined style={{ padding: 5, fontSize: 35, borderRadius: "50%" }} />}
            title="Segurança"
            description={<Text> Seus dados estão seguros aqui. Fique tanquilo! </Text>}
          />
        </Card>

        <Card
          onClick={() => setModalEngneVisible(true)}
          hoverable
          style={{
            width: 300,
            marginTop: 16,
            borderRadius: 10,
            borderLeft: "6px solid #5b5b5b"
          }}
          loading={false}
        >
          <Meta
            avatar={<CreditCardOutlined style={{ padding: 5, fontSize: 35, borderRadius: "50%" }} />}
            title={`Pagamento seguro`}
            description={<Text> seu meio de pagamento você escolhe </Text>}
          />
        </Card>

        <Card
          onClick={() => setModalEngneVisible(true)}
          hoverable
          style={{
            width: 300,
            marginTop: 16,
            borderRadius: 10,
            borderLeft: "6px solid #5b5b5b"
          }}
        >
          <Meta
            avatar={<PlusCircleOutlined style={{ padding: 5, fontSize: 35, borderRadius: "50%" }} />}
            title="Parcelamento"
            description={<Text> com ou sem cartão. Você decide!</Text>}
          />
        </Card>

        <Card
          onClick={() => setModalEngneVisible(true)}
          hoverable
          style={{
            width: 300,
            marginTop: 16,
            borderRadius: 10,
            borderLeft: "6px solid #5b5b5b"
          }}
        >
          <Meta
            avatar={<FieldTimeOutlined style={{ padding: 5, fontSize: 35, borderRadius: "50%" }} />}
            title="Pix"
            description={<Text> O pix aqui é realidade! Mas ainda temos outros meios :)</Text>}
          />
        </Card>

      </Row>

      <Modal
        title="Meios de pagamentos e dados"
        centered
        visible={modalEngineVisible}
        onOk={() => setModalEngneVisible(false)}
        onCancel={() => setModalEngneVisible(false)}
        width={1000}
      >
        <EngineDetails />
      </Modal>

      <Divider style={{ width: 16 }} orientation="left">
        <Title style={{ margin: 0 }}> Domésticos </Title>
      </Divider>
      <div style={{ width: "100%", padding: "0 2rem" }}>
        <ItemsCarousel
          style={{ width: 700 }}
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={width / 300}
          leftChevron={
            <button
              style={{
                color: "transparent",
                background: "transparent",
                border: "none"
              }}
            >
              <BsFillArrowLeftCircleFill color="gray" style={{ fontSize: 30 }} />
            </button>
          }
          rightChevron={
            <button
              style={{
                color: "transparent",
                background: "transparent",
                border: "none"
              }}
            >
              <BsFillArrowRightCircleFill color="gray" style={{ fontSize: 30 }} />
            </button>
          }
          outsideChevron
          gutter={1}
          chevronWidth={0}
        >
          {/* domestcProducts */}
          {
            listProduct?.map((values, index) => (
              <Col key={index}>
                <ProductCards key={index} data={values} />
              </Col>
            ))
          }
        </ItemsCarousel>
      </div>

      {/* {/* <Row style={{ justifyContent: "space-around" }} > */}

      {/* <MultiCarousel responsive={responsive}>
        {
          listProduct?.map((values, index) => (
            <Col key={index}>
              <ProductCards key={index} data={values} />
            </Col>
          ))
        }
      </MultiCarousel>; */}

      {/* </Row> */}
    </React.Fragment >
  )
}