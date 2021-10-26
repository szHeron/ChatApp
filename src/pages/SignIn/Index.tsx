import { useState } from "react";
import { useHistory } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ErrorInput } from "../SignUp/styles";
import { Content, Main, Form, Line, OtherLogin, ForgetPassword, ChangeAuthOp } from "./styles";

type erros = {
    email: string,
    password: string,
    auth: string | undefined
}

export default function SignIn(){
    const { user, setUser, signInWithEmailAndPassword, signInWithGoogle } = useAuth();
    const [erros, setErros] = useState<erros>({email: '', password: '', auth: ''});
    const history = useHistory();

    const onReCAPTCHAChange = (captchaCode: any)=>{
        if(!captchaCode) {
            return;
        }
        document.getElementById('signin')?.removeAttribute("disabled");
    }

    const handleSubmit = async ()=>{
        const validateEmail = /\S+@\S+\.\S+/;
        let check = true;
        setErros({email: '', password: '', auth: ''});

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
            const erroMsg = await signInWithEmailAndPassword();
            if(erroMsg)
                setErros((erros)=>({...erros, auth: erroMsg}));
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
                    <ForgetPassword onClick={()=>history.push('/recover')}>Esqueceu a senha?</ForgetPassword>
                    <ReCAPTCHA 
                        sitekey="6LcLSJgcAAAAAPy5dNjbUcJ9icl_KAFj_gErN2p6"
                        onChange={onReCAPTCHAChange}/>
                    <ButtonLinear disabled id="signin" type="submit">Entrar</ButtonLinear>
                    {erros.auth && <ErrorInput style={{color:'#f00'}}>{erros.auth}</ErrorInput>}
                    <span>
                        <Line/>ou<Line/>
                    </span>
                    <OtherLogin>
                        <button type="button" onClick={()=>{signInWithGoogle()}}>
                            <img width="32" height="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="entrar com o google"/>
                        </button>
                    </OtherLogin>
                    <ChangeAuthOp onClick={()=>history.push('/signup')}>Não possui uma conta? Crie uma!</ChangeAuthOp>
                </Form>
            </Main>
        </Content>
    )
}