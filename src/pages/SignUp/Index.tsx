import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { Content, Main, Form, Info, Line, OtherLogin, ErrorInput } from "./styles";

type erros = {
    name: string,
    email: string,
    password: string,
    city: string,
    age: string
}

export default function SignUp(){
    const { user, setUser, signUpWithEmailAndPassword, signInWithGoogle } = useAuth();
    const [erros, setErros] = useState<erros>({
        name: '',
        email: '',
        password: '',
        city: '',
        age: ''
    });

    const handleSubmit = ()=>{
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

        if(check)
            signUpWithEmailAndPassword();
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
                            <img width="32" height="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Sign Up with google"/>
                            <p>Entrar com o google</p>
                        </button>
                        <button>
                        <img width="32" height="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Sign Up with apple"/>
                            <p>Entrar com o apple</p>
                        </button>
                    </OtherLogin>
                    <span>
                        <Line/>ou<Line/>
                    </span>
                    <Info>
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
                    </Info>
                    <label>Email</label>
                    <input value={user?.email} onChange={(e)=>setUser({...user, email:e.target.value})} type="text"/>
                    {erros.email && <ErrorInput style={{color:'#f00'}}>{erros.email}</ErrorInput>}
                    <label>Senha</label>
                    <input value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} type="password"/>
                    {erros.password && <ErrorInput style={{color:'#f00'}}>{erros.password}</ErrorInput>}
                    <ButtonLinear type="submit">Cadastrar</ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}