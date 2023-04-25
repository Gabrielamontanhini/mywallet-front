import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"
import Teste from "../components/Teste"

export default function HomePage() {
  const [extrato, setExtrato] = useState([])
  const { sessao, setSessao } = useContext(UsuarioContext)
  const [saldo, setSaldo] = useState(0)
  const [corDoSaldo, setCorDoSaldo] = useState("entrada")
  const navigate = useNavigate()

  const url = process.env.REACT_APP_API_URL


  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${sessao.token}` } }
    if (!sessao.token) {
      navigate("/")
    }
    const carregarHome = axios.get(`${url}/home`, config)
    carregarHome.then((res) => {
      console.log(res.data)
      setSaldo((res.data.saldoFinal))
      console.log((res.data.saldoFinal))
      setExtrato([...res.data.extratoDoUsuario])
      if ((res.data.saldoFinal) <= 0) {
        setCorDoSaldo("ish")
      }
    })
    carregarHome.catch((err) => {
      console.log(err.response.data)
      navigate("/")
    })
  }, [])






  function encerrarSessao() {
    const config = { headers: { Authorization: `Bearer ${sessao.token}` } }
    const sair = axios.delete(`${url}/sair`, config)
    sair.then((res) => {
      console.log(res.data)
      navigate("/")
      localStorage.removeItem("sessao");
      setSessao()
    })
    sair.catch((err) => {
      console.log(err.response.data)
    })
  }

  if (extrato.length === 0) {
    {
      return (
        <HomeContainer>
          <Header>
            <h1>Olá, {sessao.nome}</h1>
            <BiExit onClick={encerrarSessao} />
          </Header>

          <TransactionsContainer>

            <ExtratoVazio> Não há registros de entrada ou saída</ExtratoVazio>
          </TransactionsContainer>



          <ArticleSaldo>
            <strong>Saldo</strong>
            <Value color={corDoSaldo}>R$ {saldo}</Value>
          </ArticleSaldo>



          <ButtonsContainer>
            <button>
              <Link
                to="/nova-transacao/entrada"
              >
                <AiOutlinePlusCircle />
                <p>Nova <br /> entrada</p>
              </Link>
            </button>


            <button>
              <Link to="/nova-transacao/saida">
                <AiOutlineMinusCircle />
                <p>Nova <br />saída</p>
              </Link>
            </button>
          </ButtonsContainer>

        </HomeContainer>
      )
    }


  } else {

    return (
      <HomeContainer>
        <Header>
          <h1>Olá, {sessao.nome}</h1>
          <BiExit onClick={encerrarSessao} />
        </Header>

        <TransactionsContainer>


          <ul>
            {extrato.map((movimento, index) => (
              <Teste

                key={index}
                index={index}
                dia={movimento.dia}
                descrição={movimento.descrição}
                valor={parseFloat([movimento.valor])}
                tipo={movimento.tipo}
              />
            ))}
          </ul>
        </TransactionsContainer>
        <ArticleSaldo>
          <strong>Saldo</strong>
          <Value color={corDoSaldo}>R$ {saldo}</Value>
        </ArticleSaldo>

        <ButtonsContainer>
          <button>
            <Link
              to="/nova-transacao/entrada"
            >
              <AiOutlinePlusCircle />
              <p>Nova <br /> entrada</p>
            </Link>
          </button>

          <button>
            <Link to="/nova-transacao/saida">
              <AiOutlineMinusCircle />
              <p>Nova <br />saída</p>
            </Link>
          </button>
        </ButtonsContainer>

      </HomeContainer>
    )
  }
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const ArticleSaldo = styled.article`
  background-color: #fff;
  color: #000;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`

const ExtratoVazio = styled.article`
margin: auto;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
text-align: center;
color: #868686;
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`


