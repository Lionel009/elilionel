import React, {useState} from 'react'

export const Context = React.createContext()


const ContextProvider = (props) => {
    const {children} = props
    // const [contextUser, setContextUser] = useState('')
    // const [contextMintAdress, setContextMintAdress] = useState("")
    const [contextWallet, setContextWallet] = useState("8Mt87yk3VcxsvKC84HxsU7yCs6jfYY66U9eQVCZ5zWRW")
    const [authState, setAuthState] = useState(false);
    const [contextUsername, setContextUsername] = useState("");
    
    
    // const [absorbeDataUser, setAbsorbeDataUser] = useState({})
    
    const context = {
        contextWallet,
        setContextWallet,
        authState,
        setAuthState,
        contextUsername,
        setContextUsername
    }

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
