import React from 'react'
import { Link } from 'react-router-dom'

const CardChoice = (props) => {
  return (
    <div className={`bg-${props.bgColor} col-3 text-center rounded-3 shadow `} >
        <Link to={`${props.link}`} className="text-decoration-none text-light">
            <div className='row justify-content-center align-items-center' style={{height: "200px", width: "200px"}}  >
            <div className="col-auto text-center text-decoration-none h3 ">
                <div className='text-center '>
                  {props.text}
                  </div>
            </div>
            </div> 
        </Link>
    </div>
  )
}

export default CardChoice