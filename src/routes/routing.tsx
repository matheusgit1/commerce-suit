import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom'
import { Login, Register, VerifyAcount, ResetPassword, ChangePasswordWithoutLogin, Home } from '../pages'
import { paths } from '../mocks/paths'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path={paths.home} element={<Home/>} />
        <Route path={paths.login} element={<Login/>}/>
        <Route path={paths.newAcount} element={<Register/>}/>
        <Route path={paths.verifyAcount} element={<VerifyAcount/>}/>
        <Route path={paths.resetPassword} element={<ResetPassword/>}/>
        <Route path={paths.changePasswordWithoutLogin} element={<ChangePasswordWithoutLogin/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

