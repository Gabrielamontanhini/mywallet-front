import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import UsuarioProvider, { UsuarioContext } from "./contexts/UsuarioContext"


export default function App() {

  const lsSessao = JSON.parse(localStorage.getItem("sessao"))

  return (
    <PagesContainer>
      <BrowserRouter>
      <UsuarioProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage/>} />
        </Routes>
        </UsuarioProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
