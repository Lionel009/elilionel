import {createUserWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth' // onAuthChanged helps to track changes in state.
import React, {useState, useContext} from 'react'
import {Context} from "../../hooks/ContextProvider"
import { registerUser } from '../Firebase/firebase'
//import { useTranslation } from 'react-i18next';


function Register() {
  
  const auth = getAuth();

 // add commentaire test
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  // const [loginEmail, setLoginEmail] = useState("")
  // const [loginPassword, setLoginPassword] = useState("")
  const [ setUser] = useState();
  //user,
  const [username] = useState();
  //, setUsername
  const [isUser, setIsUser] = useState(false);
  const [isMessageError, setIsMessageError] = useState();
  const context = useContext(Context)

 // const { t } = useTranslation();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    context.setAuthState(true)
  })


  const register = async () => {
    console.log(username);
    console.log(registerEmail);
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      
      setIsMessageError("")
     console.log(user)
     console.log("user.uid", user.user.uid);
     console.log("user.email", user.user.email);
      setIsUser(user)
      registerUser(user.user.uid, user.user.email)


     const AddInfo = await registerUser( user.user.uid, registerEmail)
     console.log("AddInfo", AddInfo);

    } catch (error) {
      console.log(error.message);
      setIsMessageError(error.message)
    }
  };

  

 

  return (
    <div className="App">

      { !isUser && 
        <>
        <div className="mb-3">
          <input type="email" className="form-control text-dark"  placeholder="Email.." onChange={(event) => {setRegisterEmail(event.target.value)}}      />
        </div>

        {/* <div className="mb-3">
          <input type="text" className="form-control text-dark"  placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}      />
        </div> */}

        <div className="mb-3">
          <input type="password" className="form-control text-dark"  placeholder="Password.." onChange={(event) => {setRegisterPassword(event.target.value)}}      />
        </div>

        {/* <div className="mb-3">
          <input type="password" className="form-control text-dark"  placeholder="Confirm Password.." onChange={(event) => {setRegisterPassword(event.target.value)}}      />
        </div> */}

        <div className="mb-3">
          <button className='btn-hover color-11' onClick={register}>Create User</button>
          {/* <ConnectButton className="btn-hover color-11">{wallet?shortenAddress(wallet.publicKey.toBase58()):t('header.button')}{setWallet(wallet)}</ConnectButton><br/> */}

        </div>
        </>
      }

      { isUser && 
        <>
          <h1 className='text-danger'>thank you for your registering, please wait your admin</h1>
        </>
      }
      { isMessageError && 
        <>
          <h6 className='text-danger'>your email is already exist</h6>
        </>
      }

    
    </div>
  );
}

export default Register;
