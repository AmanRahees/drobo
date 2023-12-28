import React from 'react'
import "./inline.css"

function InlineBox({children}) {
  return (
    <div className='inline-container'>
        <div className="inline-overlay"></div>
        <div className="inlineBox-body">
            {children}
        </div>
    </div>
  )
}

export default InlineBox