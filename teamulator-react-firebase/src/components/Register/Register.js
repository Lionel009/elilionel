import {createUserWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth' // onAuthChanged helps to track changes in state.
import React, {useState, useContext} from 'react'
import {Context} from "../../hooks/ContextProvider"
import { registerUser } from '../Firebase/firebase'
//import { useTranslation } from 'react-i18next';

function Register() {
  
  const auth = getAuth();
  const context = useContext(Context) 
   // const { t } = useTranslation();

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [flagRegistered, setFlagRegistered] = useState(null)
  const [isMessageError, setIsMessageError] = useState();

  onAuthStateChanged(auth, (currentUser) => {
    context.setContextUser(currentUser);
  })

  // React.useEffect(() => {
  //   console.log('le user Securisé est :', context.contextUser);
  // }, [context.contextUser])
  

  const register = async () => {
    console.log(registerEmail);
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      setIsMessageError("")
      setFlagRegistered(user)
      const AddInfo = await registerUser( user.user.uid, registerEmail)
      
      console.log("AddInfo", AddInfo);

    } catch (error) {
      console.log(error.message);
      setIsMessageError(error.message)
    }
  };

  

 

  return (
    <div className="App">

      { !flagRegistered && 
        <>
        <div className="mb-3">
          <input type="email" className="form-control text-dark"  placeholder="Email.." onChange={(event) => {setRegisterEmail(event.target.value)}}      />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control text-dark"  placeholder="Create new Password.." onChange={(event) => {setRegisterPassword(event.target.value)}}      />
        </div>

        {/* <div className="mb-3">
          <input type="password" className="form-control text-dark"  placeholder="Repeat your Password.." onChange={(event) => {setRegisterPassword(event.target.value)}}      />
        </div> */}

        {/* <div className="mb-3">
          <input type="password" className="form-control text-dark"  placeholder="Confirm Password.." onChange={(event) => {setRegisterPassword(event.target.value)}}      />
        </div> */}

        <div className="mb-3">
          <button className='btn-hover color-11' onClick={register}>Create User</button>
          {/* <ConnectButton className="btn-hover color-11">{wallet?shortenAddress(wallet.publicKey.toBase58()):t('header.button')}{setWallet(wallet)}</ConnectButton><br/> */}

        </div>
        </>
      }

      { flagRegistered && 
        <>
          <h1 className='text-danger'>thank you for your registering, please wait your admin</h1>
        </>
      }
      { isMessageError && 
        <>
          <h6 className='text-danger'>{isMessageError}</h6>
        </>
      }

    
    </div>
  );
}

export default Register;
