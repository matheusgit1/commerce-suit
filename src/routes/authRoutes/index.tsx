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

      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}