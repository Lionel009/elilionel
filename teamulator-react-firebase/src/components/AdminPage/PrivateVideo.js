import React, {useEffect, useState} from 'react'
import CreateVideo from '../CreateVideo/CreateVideo'
import { Link } from 'react-router-dom'
import { getVideoDB, db } from '../Firebase/firebase'
import {deleteDoc, doc } from 'firebase/firestore/lite';


const PrivateVideo = () => {

  const [videoDB, setVideoDB] = useState([])
  const [flagDelete, setFlagDelete] = useState(false)

  useEffect(() => {
    FetchVideoDB()
  }, [flagDelete])

  const FetchVideoDB = async () => {
    var stockReponse2 = await getVideoDB()
    console.log("stockReponseVideo", stockReponse2);
    setVideoDB(stockReponse2)
  }  

  return (
    <div className='bg-dark'>
    <div className='container'>
      <div className="row justify-content-start">
        <div className="col-4">
            <Link to="/AdminPage" className='text-decoration-none text-light'>
                return
            </Link>
        </div>
      </div>

      <CreateVideo/>
      {videoDB &&
          videoDB.map((video) => (
              <div key={video.id} className="text-center border border-secondary py-3 my-4 rounded ">
                  <div className="row justify-content-end">
                    <div className="col-auto m-3">
                      <button className="btn btn-danger"  onClick={async()=>{
                       await deleteDoc(doc(db, "video", video.id));
                       setFlagDelete(true)
                       alert("Video Deleted")
                      }}>Delete Video</button>
                    </div>
                  </div>
                  
                  <h2>{video.title} <span className='text-secondary' style={{fontSize: "10px"}}> du {video.DateVideo}</span></h2>
                  <p>{video.PresentationVideo}</p>
                  <video width="400" controls>
                      <source src={video.video} type="video/mp4" />
                  </video>
              </div>
          )) 
        }
      
    </div>
    </div>
  )
}

export default PrivateVideo