import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faTrash} from '@fortawesome/free-solid-svg-icons'
import Struct from '../../../components/backend/Struct/Struct'
import iphone from '../../../assets/imgs/iphone15.png'
import Modal from '../../../components/backend/Modal/Modal'
import "./product.css"

function Products() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleSelected = (id) => {
    if (selected.includes(id)){
        setSelected(prevSelected => prevSelected.filter(selectedId => selectedId !== id))
    }else{
        setSelected(prevSelected => [...prevSelected, id]);
    }
  }
  const handleDeletion = () => {
    console.log(selected);
    setSelected([])
    setDeleteModal(false);
  }
  return (
    <Struct>
        <div className="float-right flex flex-col-reverse md:flex-row gap-2 mb-2">
            {selected.length > 0 &&
            <button onClick={()=>setDeleteModal(true)} className='bg-red-600 py-1 px-3 rounded-md'>
                <FontAwesomeIcon icon={faTrash}/> ({selected.length})
            </button>}
            <Link className='bg-sub-color py-1 px-3 rounded-md'
               to="/admin/products/add" >Add +</Link>
        </div>
        <h1 className='text-3xl md:text-4xl text-sub-color'>Products</h1>

        <div className="pl-searchBox">
            <input type="text" placeholder='Search...' />
            <FontAwesomeIcon icon={faSearch} className='pl-searchIcon'/>
        </div>

        <div className="pl_filter my-4">
            <button onClick={()=>setFilter("All")} className={`${filter === "All" ? "active" : null}`}>
            All
            </button>
            <button onClick={()=>setFilter("Newest")} className={`${filter === "Newest" ? "active" : null}`}>
            Newest
            </button>
            <button onClick={()=>setFilter("Oldest")} className={`${filter === "Oldest" ? "active" : null}`}>
            Oldest
            </button>
            <button onClick={()=>setFilter("Most Used")} className={`${filter === "Most Used" ? "active" : null}`}>
            Most Used
            </button>
        </div>

        <div className="_pdtBox">
            <div className="_pdtItem">
                <img src={iphone} alt="" />
                <input type="checkbox" className='_pdtCheckBox' onChange={()=>handleSelected(1)} checked={selected.includes(1)} />
                <div className="_pdtDown">
                    <h1>Samsung Galaxy S23 Ultra</h1>
                    <span className="my-1">Category : <b>Mobile</b></span>
                    <span className="my-1">Brand : <b>Samsung</b></span>
                    <button className='w-full mt-3 bg-black py-2 rounded-md'>View →</button>
                </div>
            </div>
        </div>

        {deleteModal &&
        <Modal>
            <h1 className='modal-heading'>Modal Heading</h1>
            <div className="modal-divider"></div>
            <p className='modal-content'>Are you sure that you want to delete this Items?</p>
            <div className="modal-divider"></div>
            <div className="modal-btns">
                <button onClick={()=>setDeleteModal(false)} className='bg-gray-800'>Cancel</button>
                <button onClick={()=>handleDeletion()} className='bg-red-600'>Yes</button>
            </div>  
        </Modal>}

    </Struct>
  )
}

export default Products