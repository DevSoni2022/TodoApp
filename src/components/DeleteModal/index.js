import React from 'react'
import './delete.scss'
const index = ({deleteModal,noDelete}) =>{
  return (
    <div className='modal-main'>
        <div className='modal-content'>
            <span className='modal-text'>Delete this task ?</span>
            <div className='btn-container'>
                <button onClick={()=>deleteModal}>Yes</button>
                <button onClick={()=>noDelete}>No</button>
            </div>
        </div>
    </div>
  )
}

export default index