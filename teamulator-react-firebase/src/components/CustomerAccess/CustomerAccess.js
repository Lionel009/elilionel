import React, { useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import {Context} from "../../hooks/ContextProvider"
import { getVideoDB } from '../Firebase/firebase'


const CustomerAccess = () => {

  const context = useContext(Context)
  const history = useHistory(); 

  const [videoDB, setVideoDB] = React.useState([])

  useEffect(() => {
      FetchVideoDB()
  }, [])

  const FetchVideoDB = async () => {
    var stockReponse2 = await getVideoDB()
   // console.log("stockReponseVideo", stockReponse2);
    setVideoDB(stockReponse2)

}    

  useEffect(() => {
 //   console.log(context.contextAccess);
    if (context.contextAccess === null || context.contextAccess === false ) {
        alert("access denied");
        history.push('/');
    }
    // return () => {
    //     // nettoyage des variables utilisé pour rien
    //     setfirst()
    //   }
}, [context.contextAccess, history])

  return (
    <>
      <div className='row justify-content-center align-items-center' >
        <div className="col-auto">
          <h3 className='text-center'>Private Video</h3>
        </div>
      </div>
      <div>
            {videoDB &&
               videoDB.map((video, index) => (
                   <div key={index} className="text-center border py-3">
                       <h2>{video.title} <span className='text-secondary' style={{fontSize: "10px"}}> du {video.DateVideo}</span></h2>
                       <p>{video.PresentationVideo}</p>
                        <video width="400" controls>
                            <source src={video.video} type="video/mp4" />
                        </video>
                    </div>
               )) 
            }
           
        </div>
    </>
  )
}

export default CustomerAccess