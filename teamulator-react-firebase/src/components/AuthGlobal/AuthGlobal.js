import React from 'react'
//, { useContext } 
import Nav from 'react-bootstrap/Nav'
import Forget from "../ForgetPassword/ForgetPassword"
import Register from "../Register/Register"
import LoginFirebase from "../LoginFirebase/LoginFirebase"
//import { useTranslation } from 'react-i18next';
//import { Context } from "../../hooks/ContextProvider"



const Index = () => {

  //  const { t } = useTranslation();
    const [login, setLogin] = React.useState(true)
    const [register, setRegister] = React.useState(false)
    const [forget, setForget] = React.useState(false)
 

  //  const context = useContext(Context)

    function dispatchNav(selectedKey) {

        switch (selectedKey) {
            case "Login":
                setRegister(false)
                setLogin(true)
                setForget(false)
                break;
            case "Register":
                setRegister(true)
                setLogin(false)
                setForget(false)
                break;
            case "Forget":
                setRegister(false)
                setLogin(false)
                setForget(true)
                break;
        
            default:
                setRegister(false)
                setLogin(true)
                setForget(false)
                break;
        }

    }


    return (

        <div className='container' >
            <div className="row justify-content-center items-align-center">
                <div className="col-6">
                    <Nav variant="tabs" className="justify-content-center mt-5" onSelect={(selectedKey) => dispatchNav(selectedKey)}>

                        <Nav.Item>
                            <Nav.Link className={login ? "text-pink mx-3" : "text-light mx-3"} eventKey="Login">Login</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link className={register ? "text-pink mx-3" : "text-light mx-3"} eventKey="Register">Register</Nav.Link>
                        </Nav.Item>

                        {/* <Nav.Item>
                            <Nav.Link className={forget ? "text-pink mx-3" : "text-light mx-3"} eventKey="Forget">Forget Password</Nav.Link>
                        </Nav.Item> */}

                    </Nav>

                    <div className="container-fluid mt-4" >
                        {login && <LoginFirebase />}
                        {register && <Register />}
                        {forget && <Forget />}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index
