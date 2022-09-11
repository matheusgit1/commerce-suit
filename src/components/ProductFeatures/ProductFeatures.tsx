import React from 'react'
import { Table, List, Typography } from 'antd'

interface IProductFeatures {
  title: string
  body: {
    [x: string]: string
  }
}

interface props {
  data?: IProductFeatures[]
}

export const ProductFeatures: React.FC<props> = ({ data }) => {

  const [tbNames, setTbName] = React.useState<Array<any> | undefined>()
  const [tbInfos, setTbInfos] = React.useState<Array<any> | undefined>()

  React.useEffect(() => {
    //preparando tabelas de ProductFeatures
    const initialize = () => {
      const tb_keys = data && Object.keys(data[0].body)
      const tb_values = data && Object.values(data[0].body)
      setTbName(tb_keys)
      setTbInfos(tb_values)
    }

    initialize()
  }, [data])



  return (
    <React.Fragment>
      {
        data?.map((values, index) => (
          <div key={index} style={{ margin: "20px 0" }}>
            <List
              itemLayout="horizontal"
              bordered
              header={<Typography.Text style={{ fontSize: 20 }}>{values.title}</Typography.Text>}
              dataSource={tbNames}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ padding: "0 0px" }}
                    title={<Typography.Text style={{ fontSize: 15, fontWeight: "500" }}>{item}</Typography.Text>}
                    description={tbInfos ? <Typography.Text style={{ fontSize: 13 }}>{tbInfos[index]}</Typography.Text> : ""}
                  >

                  </List.Item.Meta>
                </List.Item>
              )}
            />
          </div>
        ))
      }
    </React.Fragment>
  )
}