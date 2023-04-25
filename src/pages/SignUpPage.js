import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from "axios"


export default function SignUpPage() {
const navigate = useNavigate()

const [nome, setNome]=useState("")
const [email, setEmail]=useState("")
const [senha, setSenha]=useState("")

const [teste, setTeste]=useState([])

useEffect(() => {
  const promise = axios.get("http://localhost:5000/cadastro")
  promise.then((res) => {
    console.log(res.data)
  })
  promise.catch((err) => {console.log(err.responde.data)})
}, [])

function fazerCadastro(e){
  e.preventDefault()
  const body = {nome, email, senha}
  console.log(body)
  axios.post("http://localhost:5000/cadastro", body)
        .then(res => {navigate("/")})
        .catch(err => console.log(err.response.data))
  
}



  return (
    <SingUpContainer>
      <form onSubmit={fazerCadastro}>
        <MyWalletLogo />
        <input 
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={e => setNome(e.target.value)}
        />
        <input 
        placeholder="E-mail" 
        type="email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password" 
        value={senha}
        onChange={e => setSenha(e.target.value)}
        />
        <input 
        placeholder="Confirme a senha" 
        type="password" 
        autoComplete="new-password" 
        />

        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
