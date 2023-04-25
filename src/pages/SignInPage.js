import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import { UsuarioContext } from "../contexts/UsuarioContext"



export default function SignInPage() {
  const navigate = useNavigate()

  const [email, setEmail]=useState("")
  const [senha, setSenha]=useState("")
  const { setSessao } = useContext(UsuarioContext)
  const url = process.env.REACT_APP_API_URL

  function fazerLogin(e){
    e.preventDefault()
    const body = {email, senha}
    axios.post(`${url}/`, body)
        .then(res =>{
        const {nome, token} = res.data
        setSessao({nome, token})
        localStorage.setItem("sessao", JSON.stringify({nome, token}))
          navigate("/home")
        } )
        .catch(err => console.log(err.response.data))
  }


  return (
    <SingInContainer>
      <form onSubmit={fazerLogin}>
        <MyWalletLogo />
        <input 
        placeholder="E-mail" 
        type="email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input 
        placeholder="Senha" 
        type="password" 
        autoComplete="new-password" 
        value={senha}
        onChange={e => setSenha(e.target.value)}
        />
        <button type="submit">Entrar </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
