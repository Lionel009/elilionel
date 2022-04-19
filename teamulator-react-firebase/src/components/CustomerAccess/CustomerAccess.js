import React, { useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import {Context} from "../../hooks/ContextProvider"


const CustomerAccess = () => {

  const context = useContext(Context)
  const history = useHistory(); 

  useEffect(() => {
    console.log(context.contextAccess);
    if (context.contextAccess === null || context.contextAccess === false ) {
        alert("access denied");
        history.push('/');
    }
    // return () => {
    //     // nettoyage des variables utilisé pour rien
    //     setfirst()
    //   }
}, [context.contextAccess, history ])

  return (
    <div className='row justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
      <div className="col-auto">
        <h3 className='text-center'>Venez voir nos meilleurs videos</h3>
      </div>
    </div>
  )
}

export default CustomerAccess