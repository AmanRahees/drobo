import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/frontend/Home/Home'
import Dashboard from './pages/backend/Dashboard/Dashboard';
import Customer from './pages/backend/Customer/Customer';
import Category from './pages/backend/Category/Category';
import AdminLogin from './pages/backend/Login/Login';
import Brands from './pages/backend/Brands/Brands';
import Products from './pages/backend/Products/Products';
import AddProduct from './pages/backend/Products/AddProduct';
import Orders from './pages/backend/Orders/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/customers' element={<Customer/>}/>
        <Route path='/admin/category' element={<Category/>}/>
        <Route path='/admin/brands' element={<Brands/>}/>
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/admin/products/add' element={<AddProduct/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
