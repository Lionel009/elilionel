import React, { useState, useEffect } from "react";
import { getUsersNoAdmin, updateBoolValue } from "../Firebase/firebase";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

//import { useHistory } from "react-router-dom";
//import {Context} from "../../hooks/ContextProvider"

const Users = () => {
  const [first, setfirst] = React.useState([]);
  useEffect(() => {
    FetchUsers();
  }, []);

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

  const FetchUsers = async () => {
    var stockReponse = await getUsersNoAdmin();
    setfirst(stockReponse);
  };

  const handleChange = async (e, uid) => {
    let isChecked = e.target.checked;
    console.log(isChecked, uid);
    await updateBoolValue(isChecked, uid);
  };

  return (
    <div className="bg-dark">
      {/* { context.contextRole === 1 && */}
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-4">
            <Link to="/AdminPage" className="text-decoration-none text-light">
              Return
            </Link>
          </div>
        </div>
        <h2 className="text-center">Hello Admin </h2>

        <h6 className="text-center">
          vous pouvez Ajouter, ou Supprimer des Videos
        </h6>
        <h6 className="text-center">Ainsi que valider vos users</h6>

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
                      label={
                        user.isAccess ? "Supprimer l'accés" : "Activer l'accés"
                      }
                      defaultChecked={user.isAccess}
                      onChange={(e) => handleChange(e, user.uid)}
                    />
                    ( actuellement : {user.isAccess.toString()} )
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* } */}
    </div>
  );
};

export default Users;
