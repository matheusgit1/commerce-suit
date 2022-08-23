import React from 'react';
import {
  Route,
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
} from '../pages'
import { paths } from '../mocks/paths'
import { ToastContainer } from 'react-toastify';
import type { MenuProps } from 'antd';
import { AuthRoutes } from './authRoutes'
import { Header } from '../components'
import { useLocation } from 'react-router-dom'

export const Radix = () => {
  const location = useLocation()
  const authRoutes: string[] = [
    paths.login,
    paths.newAcount,
    paths.verifyAcount,
    paths.resetPassword,
    paths.changePasswordWithoutLogin,
  ]

  return (
    <React.Fragment>
      <AuthRoutes />
      {
        !authRoutes.includes(location.pathname) && <Header />
      }
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}
