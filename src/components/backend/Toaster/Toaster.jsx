import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import "./toaster.css"

function Toaster({type, message}) {
    if (type === "danger"){
        return(
            <div className="toasterBox bg-red-600">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faCircleXmark}/> &nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
    else if (type === "success"){
        return(
            <div className="toasterBox bg-green-600">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faCircleCheck}/> &nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
    else if (type === "warning"){
        return(
            <div className="toasterBox bg-amber-400">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faTriangleExclamation}/> &nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
}

export default Toaster