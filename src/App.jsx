import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/frontend/Home/Home'
import Dashboard from './pages/backend/Dashboard/Dashboard';
import Customer from './pages/backend/Customer/Customer';
import Category from './pages/backend/Category/Category';
import AdminLogin from './pages/backend/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/customers' element={<Customer/>}/>
        <Route path='/admin/category' element={<Category/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
