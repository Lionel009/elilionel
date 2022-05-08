import React, { useState} from "react";
import InsertImage from "../InsertImage/InsertImageResumable";
//import {Context} from "../../hooks/ContextProvider";
import { createVideo } from '../Firebase/firebase';

const CreateVideo = () => {
 //   const context = useContext(Context)
    const [objectCreateVideo, SetObjectCreateVideo] = useState({
        titleVideo : "", 
        PresentationVideo : "",
        DateVideo : "",
        stringVideo : "" 
    })
    const [articleVideoSend, setArticleVideoSend] = useState(false)
  

    const handleVideo = e => {
        const { name, value } = e.target;
        SetObjectCreateVideo(prevState => ({...prevState, [name]: value}) ) ;
    };

    const valideFormulaire = async () => {
        console.log(objectCreateVideo)
        if (objectCreateVideo.titleVideo==="" || objectCreateVideo.PresentationVideo ==="" || objectCreateVideo.DateVideo ===""  || objectCreateVideo.stringVideo==="" ) {
            alert("un élément n'est pas rempli")
        }

         const SendVideo = await createVideo(objectCreateVideo) 
          console.log("SendVideo", SendVideo);
         if (SendVideo) {
             console.log("l'image a été envoyé");
             setArticleVideoSend(true)

         }
        
    }

    
  return (
    <div className="h1 text-light" >
      <div className="row justify-content-center">
        <div className="col-8 rounded bg-light">
        
            { !articleVideoSend ?
                (   <>
                        <h2 className="text-dark">Insert Private Video</h2>

                    
                        <input type="text" className="form-control text-dark" placeholder="Titre de votre video" name="titleVideo"  onChange={handleVideo}   />
                        <input type="text" className="form-control text-dark"  placeholder="Presenter votre video" name="PresentationVideo" onChange={handleVideo}   />
                        <input  type="date" className="form-control text-secondary"  name="DateVideo" onChange={handleVideo}   />
                        <InsertImage />
                
                        <input  type="text" className="form-control text-secondary" placeholder="Please Copy Past Url of your File" name="stringVideo" onChange={handleVideo}  />
                    
                        
                        <br /> 
                        <input type="submit" className="btn btn-primary" disabled={false} onClick={valideFormulaire} value="Poster votre video" />
                    </>
                )
                :
                (
                    <h2 className="text-success">Votre Video à été envoyé avec Success</h2>
                )
            }


       

        </div>
      </div>
      
    </div>
  )
}

export default CreateVideo;
