import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import "./struct.css"

function Struct({children}) {
  return (
    <div className='admin-block'>
      <div className="admin-struct">
        <Sidebar/>
        <div className="pl-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Struct