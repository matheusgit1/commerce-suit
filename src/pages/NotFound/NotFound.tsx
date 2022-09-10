import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'
import { paths } from '../../mocks/paths'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Result
        status="404"
        title="404"
        subTitle="Página não encontrada!"
        extra={<Button onClick={() => navigate(paths.home)} type="primary">Voltar ao inicio</Button>}
      />
    </React.Fragment>
  )

}
