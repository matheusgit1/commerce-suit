import React from 'react'
import { Card, Typography, Col, Row } from 'antd'
import { useWindowDimensions } from '../../hooks/useWindownDimension'
import { BsPaypal } from 'react-icons/bs'
import { FaDonate, FaCcMastercard, FaTicketAlt } from 'react-icons/fa'
import { AiFillCreditCard, AiOutlineCodeSandbox, AiOutlineBarcode } from 'react-icons/ai'
import { RiVisaFill } from 'react-icons/ri'
import { SiMastercard, SiNubank } from 'react-icons/si'
import { TbBuildingBank } from 'react-icons/tb'
import { BsClockHistory, BsCashCoin } from 'react-icons/bs'
interface props { }

export const EngineDetails: React.FC<props> = ({ }) => {
  const { Meta } = Card
  const { Title, Link, Text } = Typography
  const { width } = useWindowDimensions()
  return (
    <React.Fragment>
      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <BsPaypal color="blue" style={{ fontSize: 45 }} />}
          title={<Title level={4}>Paypal</Title>}
          description={
            <Text type="secondary">
              Pagar com o Paypal é escolher qualquer um destes meios.
              É rápido, seguro e não tem custo adicional.
            </Text>}
        //"Pagar com o Mercado Pago é escolher qualquer um destes meios. É rápido, seguro e não tem custo adicional."
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <FaDonate color="#f1c232" style={{ fontSize: 45 }} />}
          title={<Title level={4}>Parcelamento no boleto</Title>}
          description={<>
            <Text type="secondary">
              Tenha crédito imediato, compre e pague as parcelas todo mês com boleto,
              na lotérica ou com o dinheiro da sua conta do Mercado Pago.
            </Text><br />
            <Link href=''> saiba mais </Link><br />
            <Text type="secondary">Aprovação imediata</Text>
          </>
          }
        />
        <Meta
          title=""
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <AiFillCreditCard color="blue" style={{ fontSize: 45 }} />}
          title={
            <>
              <Title level={4}>Cartões de crédito em </Title>
              <Title type="success" level={4}>
                até 10x sem juros
              </Title>
            </>

          }
          description={<>
            <Text type="secondary">
              Em produtos selecionados.
            </Text><br />
            <Text type="secondary">Aprovação imediata.</Text><br />
            <Row>
              <Col span={8}>
                <RiVisaFill style={{ fontSize: 45 }} />
              </Col>
              <Col span={8}>
                <SiMastercard style={{ fontSize: 45 }} />
              </Col>
            </Row>

          </>
          }
        />
        <Meta
          title=""
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <AiFillCreditCard color="blue" style={{ fontSize: 45 }} />}
          title={
            <>
              <Title level={4}>Cartões de</Title>
              <Title type="success" level={4}>
                débito
              </Title>
            </>
          }
          description={
            <>
              <Text type="secondary">Aprovação imediata.</Text><br />
              <Row gutter={16}>
                <Col span={8}>
                  <FaCcMastercard style={{ fontSize: 45 }} />
                </Col>
                <Col span={8}>
                  <SiNubank style={{ fontSize: 45 }} />
                </Col>
                <Col span={8}>
                  <TbBuildingBank style={{ fontSize: 45 }} />
                </Col>
              </Row>
            </>
          }
        />
        <Meta
          title=""
        />
      </Card>
      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <BsClockHistory style={{ fontSize: 45 }} />}
          title={
            <Title level={4}>Pix </Title>
          }
          description={
            <>
              <Text>
                Você pode pagar a qualquer momento com seu código,
                sem custo adicional e o crédito é na hora.
              </Text><br />
              <Text type="secondary">Aprovação imediata.</Text><br />
              <AiOutlineCodeSandbox style={{ fontSize: 45 }} />
            </>
          }
        />
        <Meta
          title=""
        />
      </Card>

      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <FaTicketAlt color="red" style={{ fontSize: 45 }} />}
          title={
            <Title level={4}>Boleto bancário </Title>
          }
          description={
            <>
              <Text>
                Ao comprar, explicaremos como fazer o pagamento em qualquer agência bancária,
                caixa eletrônico, Internet Banking ou correspondentes bancários.
              </Text><br />
              <AiOutlineBarcode style={{ fontSize: 45 }} />
            </>
          }
        />
        <Meta
          title=""
        />
      </Card>

      <Card style={{ marginTop: 16 }} loading={false}>
        <Meta
          avatar={width > 400 && <BsCashCoin color="green" style={{ fontSize: 45 }} />}
          title={
            <Title level={4}>Dinheiro na sua conta do Mercado Pago</Title>
          }
          description={
            <>
              <Text>
                Ao finalizar sua compra, você pagará com saldo disponível na sua conta.
                Você pode depositar dinheiro em Mercado Pago via transferência, cartão virtual Caixa,
                lotérica ou boleto.
              </Text><br />
              <Text type="secondary"> Aprovação imediata.</Text><br />
              <Link href=''>ver mais</Link>
            </>
          }
        />
        <Meta
          title=""
        />
      </Card>
    </React.Fragment>
  )
}