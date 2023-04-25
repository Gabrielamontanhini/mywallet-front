import axios from "axios"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UsuarioContext } from "../contexts/UsuarioContext"


export default function TransactionsPage() {

  const {tipo} = useParams()
  const [nova]=useState(tipo)
  const navigate = useNavigate()
  const [valor, setValor]=useState()
  const [descrição, setDescrição]=useState()
  const [dia, setDia] = useState()
  const { sessao } = useContext(UsuarioContext)
  

  useEffect(() => {
    setDia(dayjs().format('DD/MM'))
    if (!sessao){
      navigate("/")
    }
}, [])


function salvarMovimento(e){
  e.preventDefault()
    const config = { headers: { Authorization: `Bearer ${sessao.token}` } }

setValor(parseFloat(valor))

  const body={valor, descrição, dia}
    const promise = axios.post(`http://localhost:5000/nova-transacao/${tipo}`,body, config)
    promise.then((res)=>{
      console.log(res.data, `Movimento adicionado!${typeof(valor)}`)
      navigate("/home")
    })

  promise.catch((err)=> console.log(err.response.data))
}


  return (
    <TransactionsContainer>
      <h1>Nova {nova}</h1>
      <form onSubmit={salvarMovimento}>
        <input 
        placeholder="Valor" 
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        />
        <input 
        placeholder="Descrição" 
        type="text" 
        value={descrição}
        onChange={e => setDescrição(e.target.value)}
        />
        <button type="submit">Salvar {nova}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
