import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBarsStaggered, faBox, faBoxes, faDashboard, faGear, faPowerOff, faTableCells, faTruckFast, faUserCircle, faUsers} from '@fortawesome/free-solid-svg-icons'
import "./sidebar.css"

function Sidebar() {
    const location = useLocation();
    const [sideXtnd, setSideXtnd] = useState(false);
  return (
    <div className={`sidebar ${sideXtnd ? "active" : ""}`}>
        <div className="sidebar-logo">
            <h1>drobo.</h1>
            <button onClick={()=>setSideXtnd(!sideXtnd)}>
                <FontAwesomeIcon className='text-2xl' icon={faBarsStaggered}/>
            </button>
        </div>
        <div className="sidebar-user">
            <FontAwesomeIcon className='sidebar-user-icon border-2 rounded-full border-slate-800' icon={faUserCircle}/>
            <div className="sidebar-details">
                <h2 className='text-lg'>Aman Rahees</h2>
                <span className='text-gray-600'>Admin</span>
            </div>
        </div>
        <div className="sidebar-Items">
            <Link to="/admin" className={`sidebar-Item ${location.pathname === "/admin" ? "active" : ""}`}>
                <FontAwesomeIcon icon={faDashboard}/> <span> &nbsp; Dashboard</span>
            </Link>
            <Link to="/admin/customers" className={`sidebar-Item ${location.pathname.includes("/admin/customers") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faUsers}/> <span> &nbsp; Customers</span>
            </Link>
            <Link to="/admin/category" className={`sidebar-Item ${location.pathname.includes("/admin/category") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faBoxes}/> <span> &nbsp; Category</span>
            </Link>
            <Link to="/admin/brands" className={`sidebar-Item ${location.pathname.includes("/admin/brands") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faBox}/> <span> &nbsp; Brands</span>
            </Link>
            <Link to="/admin/products" className={`sidebar-Item ${location.pathname.includes("/admin/products") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faTableCells}/> <span> &nbsp; Products</span>
            </Link>
            <Link to="/admin/orders" className={`sidebar-Item ${location.pathname.includes("/admin/orders") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faTruckFast}/> <span> &nbsp; Orders</span>
            </Link>
            <Link to="/admin/orders" className={`sidebar-Item ${location.pathname.includes("/admin/orders") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faGear}/> <span> &nbsp; Settings</span>
            </Link>
            <button className={`sidebar-Item text-left text-red-500 ${location.pathname.includes("/admin/orders") ? "active" : ""}`}>
                <FontAwesomeIcon icon={faPowerOff}/> <span> &nbsp; Logout</span>
            </button>
        </div>
    </div>
  )
}

export default Sidebar