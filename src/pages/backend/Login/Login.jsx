import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import "./login.css"

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='pl-authBox'>
        <div className="pl-authForm">
            <h1>drobo.</h1>
            <form onSubmit="post">
                <div className="">
                    <label className="block">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="relative">
                    <label className="block">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="password" required />
                        <FontAwesomeIcon onClick={()=>setShowPassword(!showPassword)} className='plPwdEye' icon={showPassword ? faEyeSlash : faEye}/>
                    </div>
                </div>
                <div className="mt-4">
                    <button className='w-full py-2 text-white bg-orange-600 rounded'>Login</button>
                    <span className="block text-center text-red-600 mt-2">
                        <FontAwesomeIcon icon={faInfoCircle}/> Authorized Administrators Only!</span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin