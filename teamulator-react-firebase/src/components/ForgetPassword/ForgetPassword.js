import React, {useState, useContext}  from 'react'
import { onAuthStateChanged,  sendPasswordResetEmail, getAuth} from 'firebase/auth' // onAuthChanged helps to track changes in state.
import { Context } from "../../hooks/ContextProvider"


const ForgetPassword = () => {

    const auth = getAuth();
    const context = useContext(Context)
    // add commentaire test
     const [registerEmail, setRegisterEmail] = useState("")
     const [responseOk, setResponseOk] = useState(false)


     onAuthStateChanged(auth, (currentUser) => {
       context.setContextUser(currentUser);
     })
   

     const passwordReset = async (email) => {
   
       sendPasswordResetEmail(auth, email)
         .then((res) => {
           //console.log("on est dans le then");
           setResponseOk(true)
           console.log(responseOk);
         })
         .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
            
           // ..y
         });
     
     }
   
     return (
      <div className="App">

        <div>

          {
            !responseOk &&
            <>
              <input type="email" className="form-control text-dark" placeholder="Email.." onChange={(event) => {setRegisterEmail(event.target.value)}}/>
              <div className='my-3'>
                <button className='btn-hover color-11' onClick={(e) => {passwordReset(registerEmail)}}>Recover Password</button>
              </div>
            </>
          }
  
          
        {responseOk && 
            <>
                <div className="alert alert-success" role="alert">
                        Password reset email sent!
                </div>
            </>
        }
        </div>
   
      </div>
     );
   }

export default ForgetPassword
