import React, { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

const InsertImage = () => {

    const storage = getStorage();
    
    const [image, setImage] = useState(null) ;
    const [url, setUrl] = useState("") ;
    const [progress, setProgress] = useState(0) ;
    const [nameDoc, setNameDoc] = useState("sansNom") ;

    const handleChange = e => {
        if (e.target.files[0]) {

            // stock le nom du l'image
            setNameDoc(e.target.files[0].name)

            //stock l'image dans son integralité afin de l'envoyer
            setImage(e.target.files[0])
        }
    }

    const storageRef = ref(storage, nameDoc);
    const handleUpload = () => {

        console.log('handleUpload Open');
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log("snapshot",snapshot);
            console.log('Uploaded a blob or file!');
          });
          
    } ;


    
   // console.log("image:", image);

    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <input type="file"  onChange={handleChange} />
            <button className='btn btn-primary' onClick={handleUpload}>Upload</button>
            {/*  */}
            <br />
            {url && 
                <div>
                    {url}
                    <img src={url} alt="fb-temouna" />
                </div>
            }
            
        </div>
    )
}

export default InsertImage

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
