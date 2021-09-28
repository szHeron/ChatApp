import { useHistory } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ErrorInput } from "../SignUp/styles";
import { Content, Main, Form, Line, OtherLogin, ForgetPassword } from "./styles";

type erros = {
    email: string,
    password: string
}

export default function SignIn(){
    const { user, setUser, signInWithEmailAndPassword, signInWithGoogle } = useAuth();
    const [erros, setErros] = useState<erros>({email: '', password: ''});
    const history = useHistory();

    const handleSubmit = ()=>{
        const validateEmail = /\S+@\S+\.\S+/;
        let check = true;
        setErros({email: '', password: ''});

        if(!user?.email.trim()){
            check = false;
            setErros((erros)=>({...erros, email: "Campo email obrigatorio!"}));
        }
        if(!validateEmail.test(user?.email?user.email:'')){
            check = false;
            setErros((erros)=>({...erros, email: "Por favor, insira um email válido!"}));
        }
        if(!user?.password.trim()){
            check = false;
            setErros((erros)=>({...erros, password: "Campo senha obrigatorio!"}));
        }

        if(check){
            signInWithEmailAndPassword();
        }
    }
    return(
        <Content>
            <Aside>
                <img height="420" width="420" src="./OnlineChat.svg" alt="chat"/>
            </Aside>
            <Main>
                <h1>
                    Login
                </h1>
                <Form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
                    <label>Email</label>
                    <input value={user?.email} onChange={(e)=>setUser({...user, email:e.target.value})} type="text"/>
                    {erros.email && <ErrorInput style={{color:'#f00', margin:0}}>{erros.email}</ErrorInput>}
                    <label>Senha</label>
                    <input value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} type="password"/>
                    {erros.password && <ErrorInput style={{color:'#f00'}}>{erros.password}</ErrorInput>}
                    <ForgetPassword onClick={()=>history.push(`/recover`)}>Esqueceu a senha?</ForgetPassword>
                    <ButtonLinear type="submit">Entrar</ButtonLinear>
                    <span>
                        <Line/>ou<Line/>
                    </span>
                    <OtherLogin>
                        <button type="button" onClick={()=>{signInWithGoogle()}}>
                            <img width="32" height="32" alt="teste"src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"/>
                        </button>
                        <img width="32" height="32" alt="teste"src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"/>
                    </OtherLogin>
                </Form>
            </Main>
        </Content>
    )
}