import React, { useState, useContext } from "react";
import { getStorage, ref,  getDownloadURL, uploadBytesResumable,} from "firebase/storage";
import { Context } from "../../hooks/ContextProvider";
import ProgressBar from "react-bootstrap/ProgressBar";
//import Form from "react-bootstrap/Form";

const InsertImage = () => {
  const context = useContext(Context);

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [nameDoc, setNameDoc] = useState("sansNom");
  const [errorFirebase, setErrorFirebase] = useState(null);
  const [isRunning, setIsRunning] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      // stock le nom du l'image
      setNameDoc(e.target.files[0].name);

      //stock l'image dans son integralité afin de l'envoyer
      setImage(e.target.files[0]);
    }
  };


  

  const storage = getStorage();
  const storageRef = ref(storage, `download/${nameDoc}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  const handleUpload = () => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot.state", typeof snapshot.state);
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            setIsRunning("Upload is running...");
            break;
          default:
            console.log("default");
        }
      },
      (error) => {
        setErrorFirebase(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            context.setContextVideo(downloadURL);
            setIsRunning("");
        });
      }
    );
  };

 

  // console.log("image:", image);

  return (
    <div>
      <div>
        <ProgressBar animated now={progress} />
        {progress &&
            <div className="text-dark"> { progress!==100 ? ( (parseInt(progress)+"%") ) : ("Finish") }       </div>
        }
        
      </div>

      <br />
      <input
        style={{
          color: "white",
          border: "1px blue solid",
          borderRadius: "50px",
          fontSize: "16px",
          backgroundColor: "black",
        }}
        type="file"
        onChange={handleChange}
      />
      <br />
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>

      {errorFirebase && <div>{errorFirebase}</div>}

      {isRunning && <div>{isRunning}</div>}

      <br />

      {context.contextVideo && (
        <>
          <p className="text-dark" id="myInput" style={{fontSize: "10px"}} >{context.contextVideo}</p>
          {/* <img src={context.contextVideo} height="100px" alt={nameDoc} /> */}
        </>
      )}
    </div>
  );
};

export default InsertImage;

// const uploadTask = ref(storage,`images/${image.name}`) ;
// uploadTask.on(
//     "state_changed",
//     snapshot => {
//        const progress = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         ) ;
//         setProgress(progress)
//     },
//     error => {
//         console.log(error);
//     },
//     () => {
//         ref(storage,"images").child(image.name).getDownloadURL().then(url => {
//            console.log(url)
//             setUrl(url)
//         })
//     }
// )
