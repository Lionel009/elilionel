import React, { useEffect} from 'react'
//, useContext 
//import { useHistory } from "react-router-dom";
//import {Context} from "../../hooks/ContextProvider"

import { getUsersNoAdmin, updateBoolValue } from '../Firebase/firebase'
import  Form  from "react-bootstrap/Form"
import CreateVideo from '../CreateVideo/CreateVideo';


const AdminPage = () => {

    // const context = useContext(Context) 
    // const history = useHistory();

    const [first, setfirst] = React.useState([])

    useEffect(() => {
        FetchUsers()
       
    }, [])

    const FetchUsers = async () => {
        var stockReponse = await getUsersNoAdmin()
        setfirst(stockReponse)
    }    

  

    // useEffect(() => {
    //     if (context.contextRole === 2 || context.contextUser === null ) {
    //         alert("access denied");
    //         history.push('/');
    //     }
    //     return () => {
    //         // nettoyage des variables utilisé pour rien
    //         setfirst()
    //       }
    // }, [context.contextRole,context.contextUser, history ])
    
    const handleChange = async (e, uid) =>{
        let isChecked = e.target.checked;
        console.log(isChecked, uid);
        await updateBoolValue(isChecked, uid)
    }

    

    return (
        <>
        {/* { context.contextRole === 1 && */}
            <div className='container'>
                    <h2 className='text-center'>Hello Admin </h2>
                    <h6 className='text-center'>vous pouvez Ajouter, ou Supprimer des Videos</h6>
                    <h6 className='text-center'>Ainsi que valider vos users</h6>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">isAccessVideo</th>

                            </tr>
                        </thead>
                        <tbody>
                            {first &&

                                first.map((user, index) => (
                                    <tr key={user.uid}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.email}</td>
                                        <td>
                                        
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    label={user.isAccess? ("Supprimer l'accés"): ("Activer l'accés")}
                                                    defaultChecked={user.isAccess}
                                                    onChange={e => handleChange(e, user.uid)}
                                                />
                                        
                                        ( actuellement : {user.isAccess.toString()} )

                                        </td>
                                    </tr>
                                ))

                            }


                        </tbody>
                    </table>
   
                          <CreateVideo />
            </div>
           
        {/* } */}
 
        </>
    )
}

export default AdminPage