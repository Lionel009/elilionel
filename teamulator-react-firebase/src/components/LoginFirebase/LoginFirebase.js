import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth' // onAuthChanged helps to track changes in state.

import { Context } from "../../hooks/ContextProvider"
import { getUserData } from '../Firebase/firebase'
//import { useTranslation } from 'react-i18next';

function Register() {

  const auth = getAuth();
  const history = useHistory();
  const context = useContext(Context)
//const { t } = useTranslation();  

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [isWaiting, setIsWaiting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);


  onAuthStateChanged(auth, (currentUser) => {
    context.setContextUser(currentUser);
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log("user", user);
      if (user) {
        setIsFormOpen(false)
        setIsWaiting(true) 
        // user.user.uid
        const resultUserData = await getUserData(user.user.uid)
        
        if (resultUserData) {

        //console.log("resultUserData role", resultUserData.role); // Memorisation du Role du User
        context.setContextRole(resultUserData.role)// Memorisation du Role du User
        //console.log("resultUserData isAccess", resultUserData.isAccess); // Memorisation de des Access du User
        context.setContextAccess(resultUserData.isAccess)
        
          if (resultUserData.role === 1) {
            history.push('/adminPage');
          }else if (resultUserData.isAccess === false) {
           history.push('/NotAccess');
          }else if(resultUserData.isAccess === true){
            history.push('/customerAccess');
          }

        }

      }


      // setLoginState(true);
      // context.setAuthState(true);
    } catch (error) {
      window.alert(`${registerEmail} Doesn't exist, please check your email or password. If you are new user, please register.`)
    }
  };


  return (
    <>
      {isFormOpen &&
        (
          <div className="App">

            <div className="mb-3">
              <input type="email" className="form-control text-dark" placeholder="Email..." onChange={(event) => { setRegisterEmail(event.target.value) }} />
            </div>

            <div className="mb-3">
              <input type="password" className="form-control text-dark" placeholder="Password..." onChange={(event) => { setRegisterPassword(event.target.value) }} />
            </div>

            <div className="mb-3">
              <button className='btn-hover color-11' onClick={login}>Log in</button>
            </div>

          </div>
        )
      }


      {isWaiting &&
        (
          <div>
            <h3 className='text-center'>Please Wait...</h3>
          </div>
        )

      }


    </>
  );
}

export default Register;
