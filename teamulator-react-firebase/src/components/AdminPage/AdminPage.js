import React, { useEffect } from "react";
//, useContext
//import { useHistory } from "react-router-dom";
//import {Context} from "../../hooks/ContextProvider"

import { getUsersNoAdmin, updateBoolValue } from "../Firebase/firebase";
import CardChoice from "./CardChoice";

const AdminPage = () => {
  // const context = useContext(Context)
  // const history = useHistory();

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

  return (
    <>
      <div className="bg-dark">
        <div className="container">
          <div className="row justify-content-around align-items-center" style={{ minHeight: "100vh" }} >

            <CardChoice text="Users" bgColor="warning" link="/AdminPage/Users" />

            <CardChoice text="Private Video" bgColor="primary" link="/AdminPage/PrivateVideo" />

            <CardChoice text="Articles" bgColor="success"  link="/AdminPage/Articles" />

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
