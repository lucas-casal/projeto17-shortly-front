import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { LoggedContext } from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import buscarCookie from "../components/buscarCookie"
const pontinhos = 
<ThreeDots 
height="20" 
width="100%" 
radius="9"
color="black" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />

export default function Login() {
  const loggedcontexto = useContext(LoggedContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableForm, setDisableForm] = useState(false)

  useEffect(() => {
  },[disableForm])
  async function sendSignUpForm(ev) {
    ev.preventDefault();
    setDisableForm(true)
    const loginInfo = { email, password };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, loginInfo);
      alert(`Login feito com sucesso!`);
      const {token} = res.data
      console.log(token)
      localStorage.setItem("token", token);

//DEFININDO UM COOKIE 

      document.cookie = `token=${res.data}`
////////////////////////////////////////////

//USANDO A FUNÇÃO PARA BUSCAR O COOKIE
    //  console.log(buscarCookie('name'))
////////////////////////////////////////////

      loggedcontexto.setLogged(true)
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) return alert('Ops, parece que você digitou algo inválido. Tente novamente')
      if (err.response.status === 401) return alert('Ops, há algo de errado com o seu login, verifique o e-mail e a senha digitados')
    } finally{
      setDisableForm(false)
    }
  }

  return (
    <PageArea>
      <Header />
      <SCForm onSubmit={(ev) => sendSignUpForm(ev)}>
          <InputCadastro
            onChange={(x) => setEmail(x.target.value)}
            type="email"
            id="email"
            placeholder="E-mail"
            required
            disabled={disableForm}
          ></InputCadastro>


          <InputCadastro
            onChange={(x) => setPassword(x.target.value)}
            type="password"
            id="password"
            placeholder="Senha"
            required
            disabled={disableForm}
          ></InputCadastro>

        <BtnsContainer>
          <SendBtn type="submit" disabled={disableForm} >{ disableForm ? pontinhos : 'Login' }</SendBtn>
        </BtnsContainer>
      </SCForm>
    </PageArea>
  );
}

const SCForm = styled.form`
  width: 80vw;
  height: 275px;
  display: flex;
  position: fixed;
  top: 35vh;
  flex-direction: column;
  gap: 25px;
  align-items: center;

`
const InputCadastro = styled.input`
  width: 80%;
  height: 60px;
  border-radius: 12px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  background: #FFF;
  box-shadow: 0px 4px 24px 0px rgba(120, 177, 89, 0.80);
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 3%;
  &::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:disabled{
    opacity: 30%;
  }
`;
const SendBtn = styled.button`
  width: 182px;
  height: 60px;
  border-radius: 12px;
  margin-top: 43px;
  background: #5D9040;
  color: #FFF;
  text-align: center;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:disabled{
    opacity: 30%;
  }
`;

const BtnsContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 13%;
  justify-content: center;
`;
const PageArea = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Roboto";
`;
