import React, {useState} from 'react'

export const Context = React.createContext()

const ContextProvider = (props) => {
    const {children} = props

    const [contextUser, setContextUser] = useState(null);
    const [contextRole, setContextRole] = useState(null);
    const [contextAccess, setContextAccess] = useState(null);
    const [contextVideo, setContextVideo] = useState(null);

    const context = {
        //context permettant de stocker le user donné par firebase
        contextUser, setContextUser,

        // Role et Access permette de stocker la data du User
        contextRole, setContextRole,
        contextAccess, setContextAccess,

        // Context permettant de stocker l'url de la video
        contextVideo, setContextVideo
    }

    // React.useEffect(() => {
    //     console.log('le user Securisé est :', context.contextUser);        
    // }, [context.contextUser])

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
