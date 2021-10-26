import { useState } from 'react';
import { useHistory } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ChangeAuthOp } from '../SignIn/styles';
import { Content, Main, Form, PersonInfo, Info, Line, OtherLogin, ErrorInput } from "./styles";

type erros = {
    name: string,
    email: string,
    password: string,
    city: string,
    age: string
}

export default function SignUp(){
    const { user, setUser, signUpWithEmailAndPassword, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [erros, setErros] = useState<erros>({
        name: '',
        email: '',
        password: '',
        city: '',
        age: ''
    });

    const onReCAPTCHAChange = (captchaCode: any)=>{
        if(!captchaCode) {
            return;
        }
        document.getElementById('signin')?.removeAttribute("disabled");
    }

    const handleSubmit = async ()=>{
        let check = true;
        const validateEmail = /\S+@\S+\.\S+/;
        setErros({
            name: '',
            email: '',
            password: '',
            city: '',
            age: ''
        });

        if(!user?.email.trim()){
            check = false;
            setErros((erros)=>({...erros, email: "Campo email obrigatorio!"}));
        }
        if(!validateEmail.test(user?.email?user.email:'')){
            check = false;
            setErros((erros)=>({...erros, email: "Por favor, insira um email válido!"}));
        }
        if(!user?.name.trim()){
            check = false;
            setErros((erros)=>({...erros, name: "Campo nome obrigatorio!"}));
        }
        if(!user?.password.trim()){
            check = false;
            setErros((erros)=>({...erros, password: "Campo senha obrigatorio!"}));
        }
        if(!user?.city.trim()){
            check = false;
            setErros((erros)=>({...erros, city: "Campo cidade obrigatorio!"}));
        }
        if(Number(user?.age) > 110 || Number(user?.age) < 3){
            check = false;
            setErros((erros)=>({...erros, age: "Campo idade inválido!"}));
        }

        if(check){
            const erroMsg = await signUpWithEmailAndPassword();
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
                <h1>Cadastro</h1>
                <Form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
                    <OtherLogin>
                        <button type="button" onClick={()=>signInWithGoogle()}>
                            <img width="32" height="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Entrar com o google"/>
                            <p>Entrar com o Google</p>
                        </button>
                    </OtherLogin>
                    <span>
                        <Line/>ou<Line/>
                    </span>
                    <PersonInfo>
                        <div style={{width: '50%'}}>
                            <label>Nome</label>
                            <input value={user?.name} onChange={(e)=>setUser({...user, name:e.target.value})} type="text" style={{marginTop: '10px'}}/>
                            {erros.name && <ErrorInput style={{color:'#f00'}}>{erros.name}</ErrorInput>}
                        </div>
                        <div style={{width: '30%'}}>
                            <label>Cidade</label>
                            <input value={user?.city} onChange={(e)=>setUser({...user, city:e.target.value})} type="text" style={{marginTop: '10px'}}/>
                            {erros.city && <ErrorInput style={{color:'#f00'}}>{erros.city}</ErrorInput>}
                        </div>
                        <div style={{width: '10%'}}>
                            <label>Idade</label>
                            <input value={String(user?.age)} onChange={(e)=>setUser({...user, age: Number(e.target.value)})} type="Number" min={0} max={120} style={{marginTop: '10px'}}/>
                            {erros.age && <ErrorInput style={{color:'#f00'}}>{erros.age}</ErrorInput>}
                        </div>
                    </PersonInfo>
                    <Info>
                        <label>Email</label>
                        <input value={user?.email} onChange={(e)=>setUser({...user, email:e.target.value})} type="text"/>
                        {erros.email && <ErrorInput style={{color:'#f00'}}>{erros.email}</ErrorInput>}
                        <label>Senha</label>
                        <input value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} type="password"/>
                        {erros.password && <ErrorInput style={{color:'#f00'}}>{erros.password}</ErrorInput>}
                        <ChangeAuthOp style={{alignSelf: 'start'}} onClick={()=>history.push('/signin')}>Já possui uma conta? Entre!</ChangeAuthOp>
                    </Info>
                    <ReCAPTCHA 
                        sitekey="6LcLSJgcAAAAAPy5dNjbUcJ9icl_KAFj_gErN2p6"
                        onChange={onReCAPTCHAChange}/>
                    <ButtonLinear disabled type="submit">Cadastrar</ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}