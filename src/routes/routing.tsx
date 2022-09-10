import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import {
  Login,
  Register,
  VerifyAcount,
  ResetPassword,
  ChangePasswordWithoutLogin,
  Home,
  ProductById,
  NotFound,
  MyPurchases,
  WishList,
  Checkout
} from '../pages'
import { paths } from '../mocks/paths'
import { ToastContainer } from 'react-toastify';
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
        <Header />
        <Routes>
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.newAcount} element={<Register />} />
          <Route path={paths.verifyAcount} element={<VerifyAcount />} />
          <Route path={paths.resetPassword} element={<ResetPassword />} />
          <Route path={paths.changePasswordWithoutLogin} element={<ChangePasswordWithoutLogin />} />
          <Route path={paths.productById} element={<ProductById />} />
          <Route path={paths.home || ""} element={<Home />} />
          <Route path={paths.myPurchases} element={<MyPurchases />} />
          <Route path={paths.wishList} element={<WishList />} />
          <Route path={paths.checkout} element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </React.Fragment>
  );
}

