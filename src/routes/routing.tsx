import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'


import { paths } from '../mocks/paths'
import { Header, GlobalLoadingPage } from '../components'

const Home = React.lazy(() => import('../pages/Home/home'))
const Login = React.lazy(() => import('../pages/Login/login'))
const Register = React.lazy(() => import('../pages/Register/register'))
const VerifyAcount = React.lazy(() => import('../pages/VerifyAcount/verity-acount'))
const ResetPassword = React.lazy(() => import('../pages/ResetPassword/reset-password'))
const ChangePasswordWithoutLogin = React.lazy(() => import('../pages/ChangePasswordWithoutLogin/change-password'))
const ProductById = React.lazy(() => import('../pages/ProductById/product-by-id'))
const NotFound = React.lazy(() => import('../pages/NotFound/not-found'))
const MyPurchases = React.lazy(() => import('../pages/MyPurchases/my-purchases'))
const WishList = React.lazy(() => import('../pages/WishList/wish-list'))
const Checkout = React.lazy(() => import('../pages/Checkout/Checkout'))
const SucefullyPurchase = React.lazy(() => import('../pages/SucefullyPurchase/sucefully-purchase'))

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
        <React.Suspense fallback={<GlobalLoadingPage />}>
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
            <Route path={paths.sucefullyPurchase} element={<SucefullyPurchase />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
}

