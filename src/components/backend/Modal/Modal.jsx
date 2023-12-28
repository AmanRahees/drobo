import React from 'react'
import "./modal.css"

const Modal = ({children}) => {
  return (
    <div className='modal-container'>
        <div className="modal-overlay"></div>
        <div className="modal-body">
            {children}
        </div>
    </div>
  )
}

export default Modal