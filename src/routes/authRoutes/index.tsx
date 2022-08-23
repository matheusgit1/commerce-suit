import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom'

import {
  Login,
  Register,
  VerifyAcount,
  ResetPassword,
  ChangePasswordWithoutLogin,
  Home,
  ProductById
} from '../../pages'
import { paths } from '../../mocks/paths'
import { ToastContainer } from 'react-toastify';
import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu } from 'antd';
// import { useWindowDimensions } from '../hooks/useWindownDimension'
import { Header } from '../../components'
export const AuthRoutes = () => {


  return (
    <React.Fragment>
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.newAcount} element={<Register />} />
        <Route path={paths.verifyAcount} element={<VerifyAcount />} />
        <Route path={paths.resetPassword} element={<ResetPassword />} />
        <Route path={paths.changePasswordWithoutLogin} element={<ChangePasswordWithoutLogin />} />
        <Route path={paths.productById} element={<ProductById />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}