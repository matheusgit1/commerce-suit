import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import {
  Home,
} from '../pages'

import { paths } from '../mocks/paths'
import { ToastContainer } from 'react-toastify';
import { AuthRoutes } from './authRoutes'
import { Header } from '../components'

export const Routing = () => {

  const authRoutes: string[] = [
    paths.login,
    paths.newAcount,
    paths.verifyAcount,
    paths.resetPassword,
    paths.changePasswordWithoutLogin,
  ]

  return (
    <React.Fragment>
      <Router>
        <AuthRoutes />
        {
          !authRoutes.includes(window.location.pathname) && <Header />
        }
        <Routes>
          <Route path={paths.home} element={<Home />} />
        </Routes>
        <ToastContainer />
      </Router>
    </React.Fragment>
  );
}


{/* <Router>
                <Routes>
                  <Route path={paths.home} element={<Home />} />
                  <Route path={paths.login} element={<Login />} />
                  <Route path={paths.newAcount} element={<Register />} />
                  <Route path={paths.verifyAcount} element={<VerifyAcount />} />
                  <Route path={paths.resetPassword} element={<ResetPassword />} />
                  <Route path={paths.changePasswordWithoutLogin} element={<ChangePasswordWithoutLogin />} />
                  <Route path={paths.productById} element={<ProductById />} />
                </Routes>
                <ToastContainer />
              </Router> */}
