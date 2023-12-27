import React, {useState, useRef, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar/Sidebar'
import "./struct.css"

function Struct({children}) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropBoxRef = useRef(null);
  const handleToggleDrop = () => {
    setIsDropOpen(prevState => !prevState);
  };
  const handleClickOutside = (event) => {
    if (dropBoxRef.current && !dropBoxRef.current.contains(event.target)) {
      setIsDropOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='admin-block'>
      <div className="admin-struct">
        <Sidebar/>
        <div className="pl-content">
          <div ref={dropBoxRef} className={`pl-dropBox ${isDropOpen ? "open" : ""}`}>
            <button onClick={handleToggleDrop}>
              <FontAwesomeIcon icon={faGear}/> 
            </button>
            <div className="dropBox-menu">
              <button><FontAwesomeIcon icon={faUser}/> <span>Profile</span> </button>
              <button><FontAwesomeIcon  className='text-red-600' icon={faPowerOff}/> <span className='text-red-600'>Logout</span></button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Struct