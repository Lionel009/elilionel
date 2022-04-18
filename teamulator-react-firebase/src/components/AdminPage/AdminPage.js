import React, { useEffect } from 'react'
import { getAllUser, updateBoolValue } from '../Firebase/firebase'
import  Form  from "react-bootstrap/Form"

const AdminPage = () => {
    const [first, setfirst] = React.useState([])

    useEffect(() => {
        FetchUsers()
    }, [])

    const FetchUsers = async () => {
        var stockReponse = await getAllUser()
        setfirst(stockReponse)
    }

  const handleChange = async (e, uid) =>{
        let isChecked = e.target.checked;
        console.log(isChecked, uid);
       await updateBoolValue(isChecked, uid)

      }

    return (
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

        </div>
    )
}

export default AdminPage