import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedContext } from "../contexts/UserContext";
import shorts from "../assets/logo-shortly.png";
import buscarCookie from "./buscarCookie";
import axios from "axios";
export default function Header() {
  const {logged, setLogged} = useContext(LoggedContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const token = localStorage.getItem('token')
  useEffect( () => {
    if(token){   
    axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      setUsername(res.data.name)
      document.cookie = `id=${res.data.id}`
      document.cookie = `name=${res.data.name}`
    })

    .catch(err => {
      console.log(err)
    })
    }
    
    }, [token])

    function signOut(){
      localStorage.clear()
      document.cookie=`id=`
      document.cookie=`name=`
      setLogged(false)      
      navigate('/login')
    }
  return (
    <>
    <Head>
      <Welcoming>
        Seja bem-vindo(a), <strong>{username ? username  : 'Pessoa'}</strong>!
      </Welcoming>

      <MinimalistMenu>
        {username ? <p onClick={() => navigate('/home')}>Home</p> : <p onClick={() => navigate('/login')}>Entrar</p>}
        {username ? <p onClick={() => navigate('/')}>Ranking</p> : <p onClick={() => navigate('/cadastro')}>Cadastre-se</p>}
        {username ? <p onClick={() => signOut()}>Sair</p> : ''}

      </MinimalistMenu>
    


      <LogoSimples>
        <Shortly>Shortly</Shortly>
        <ImageLogo src={shorts} />
      </LogoSimples>

    </Head>
    </>
  );
}
const Welcoming = styled.p`
  position: fixed;
  top: 60px;
  left: 10svw;
  color: #5D9040;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const MinimalistMenu = styled.div`
  display: flex;
  position: fixed;
  top: 60px;
  right: 10vw;
  gap: 27px;
  color: #9C9C9C;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  p{
    &:hover {
      cursor: pointer;
      color: #adff00;
      &:active {
        color: #5D9040;
      }
    }
  }
`
const Shortly = styled.h1`
  color: #000;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 64px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
`
const ImageLogo = styled.img`
  height: 102px;
`
const LogoSimples = styled.div`
  max-width: 500px;
  width: 80%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: white;
  position: fixed;
  top: 95px;
  `;

const Head = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left:0;
  height: 25vh;
  width: 100vw;
  font-family: "Roboto";
  display: flex;
  justify-content: space-evenly;
  align-items: center;

/*  p {
    color: white;
    &:hover {
      cursor: pointer;
      color: #adff00;
      &:active {
        color: #318b42;
      }
    }
  }
  */
`;
const ListaProdutos = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  img {
    height: 100%;
    opacity: 25%;
    position: relative;
  }`
