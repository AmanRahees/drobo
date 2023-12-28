import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import "./toast.css"

function Toast({type, message}) {
    if (type === "danger"){
        return(
            <div className="toastBox bg-red-600">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faCircleXmark}/> &nbsp;&nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
    else if (type === "success"){
        return(
            <div className="toastBox bg-green-600">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faCircleCheck}/> &nbsp;&nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
    else if (type === "warning"){
        return(
            <div className="toastBox bg-amber-400">
                <div className="toast_message">
                    <FontAwesomeIcon icon={faTriangleExclamation}/> &nbsp;&nbsp;
                    {message}
                </div>
                <div className="toast_progress"></div>
            </div>
        )
    }
}

export default Toast;