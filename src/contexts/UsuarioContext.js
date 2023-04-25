import { createContext, useEffect, useState } from "react";

export const UsuarioContext = createContext()

export default function UsuarioProvider({ children }) {
const lsSessao = JSON.parse(localStorage.getItem("sessao"))
    const [sessao, setSessao] = useState(lsSessao)
    return (
        <UsuarioContext.Provider value={{ sessao, setSessao }}>
            {children}
        </UsuarioContext.Provider>
    )
}