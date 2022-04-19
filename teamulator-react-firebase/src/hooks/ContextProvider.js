import React, {useState, useEffect} from 'react'

export const Context = React.createContext()

const ContextProvider = (props) => {
    const {children} = props

    const [contextUser, setContextUser] = useState(null);
    const [contextRole, setContextRole] = useState(null);
    const [contextAccess, setContextAccess] = useState(null);

    const context = {
        contextUser, setContextUser,
        contextRole, setContextRole,
        contextAccess, setContextAccess
    }

    useEffect(() => {
        console.log('le user Securisé est :', context.contextUser);        
    }, [context.contextUser])

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
