import { createContext, useState } from "react"

export const Auth = createContext()

export default function AuthContext({ children }) {
    const [authData, setAuth] = useState()
    return (
        <Auth.Provider value={{ setAuth, authData }}>
            {children}
        </Auth.Provider>
    )
}
