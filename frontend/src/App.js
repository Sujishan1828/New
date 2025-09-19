import HomePage from "./Components/Home";
import Header from "./Components/Navbar/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import ProductDetails from "./Components/Product/ProductDetails";
import ProductSearch from "./Components/Product/ProductSearch";
import LoginForm from "./Components/User/LoginForm";
import RegisterForm from "./Components/User/RegisterForm";
import { useEffect } from "react";
import store from './store'
import { loadUserUser } from "./actions/userAction";
import MyProfile from "./Components/User/MyProfile";
import ProtectedRoute from "./Components/route/ProtectedRoute";
import Cart from "./Components/cart/Cart";
import ShippingInfo from "./Components/cart/ShippingInfo";
import PlaceOrder from "./Components/cart/PlaceOrder";

import ConfirmOrder from "./Components/cart/ConformOrder";
import ForgotPasswordPage from "./Components/User/ForgotPasswordPage";
import ResetPasswordForm from "./Components/User/ResetPassword";
import Payment from "./Components/cart/Payment";
import OrderSuccess from "./Components/cart/OrderSuccess";
import OrderCancel from "./Components/cart/OrderCancel";
import UserOrders from "./Components/order/UserOrders";
import OrderDetails from "./Components/order/OrderDetails";
import Dashboard from "./Components/admin/Dashboard";
import Products from "./Components/admin/Products";
import NewProductForm from "./Components/admin/NewProducts";
import UpdateProduct from "./Components/admin/UpdateProduct";
import Orders from "./Components/admin/Orders";
import UpdateOrder from "./Components/admin/UpdateOrder";
import UsersList from "./Components/admin/UsersList";
import UpdateUser from "./Components/admin/UpdateUser";
import ReviewLists from "./Components/admin/ReviewLists";
import OfferTypeProductsPage from "./Components/Product/OfferTypeProductsPage";
import AllOffers from "./Components/admin/AllOffers";
import CreateOfferPage from "./Components/admin/CreateOfferPage";
import Footer from "./Components/Navbar/Footer";
import SingleProductPage from "./SingleProductPage1";

function App() {

  useEffect(()=>{
    store.dispatch(loadUserUser)
  })
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/product/new/:id" element={<SingleProductPage/>}/>
          <Route path="/search/:keyword" element={<ProductSearch/>}/>
          <Route path="/offers/:offerType" element={<OfferTypeProductsPage/>}/>

          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/myprofile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
          <Route path="/forgot/password" element={<ForgotPasswordPage/>}/>
          <Route path="/reset/:token" element={<ResetPasswordForm/>}/>

          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path="/shipping" element={<ProtectedRoute><ShippingInfo/></ProtectedRoute>}/>
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path="/payment" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
          <Route path="/order/place" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
          <Route path="/order/cancel" element={<OrderCancel/>} />

          <Route path="/orders" element={<ProtectedRoute><UserOrders/></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
        </Routes>
      </div>
      <Routes>
        
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><Products/></ProtectedRoute>}/>
        <Route path="/admin/product/create" element={<ProtectedRoute isAdmin={true}><NewProductForm/></ProtectedRoute>}/>
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><Orders/></ProtectedRoute>}/>
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>}/>
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
        <Route path="/admin/reviews/:productId" element={<ProtectedRoute isAdmin={true}><ReviewLists/></ProtectedRoute>}/>
        <Route path="/admin/offers" element={<ProtectedRoute isAdmin={true}><AllOffers/></ProtectedRoute>}/>
        <Route path="/admin/offer/create" element={<ProtectedRoute isAdmin={true}><CreateOfferPage/></ProtectedRoute>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
