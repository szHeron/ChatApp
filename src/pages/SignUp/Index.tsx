import { useState } from 'react';
import { useHistory } from 'react-router';
import ReCAPTCHA from 'react-google-recaptcha';
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ChangeAuthOp } from '../SignIn/styles';
import { Content, Main, Form, PersonInfo, Info, Line, OtherLogin, ErrorInput, PasswordVisibility } from "./styles";

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
    const [showPassword, setShowPassword] = useState(false);
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
        document.getElementById('signupButton')?.removeAttribute("disabled");
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
                        <input value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} type={showPassword?'text':'password'}/>
                        <PasswordVisibility style={{width: '24px'}} onClick={()=>setShowPassword(!showPassword)}>
                            {
                                showPassword?
                                    <svg width="24px" height="24px" fill="#fff" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"/></svg>
                                :
                                    <svg width="24px" height="24px" fill="#fff" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg>
                                
                            }
                        </PasswordVisibility>
                        {erros.password && <ErrorInput style={{color:'#f00'}}>{erros.password}</ErrorInput>}
                        <ChangeAuthOp style={{alignSelf: 'start'}} onClick={()=>history.push('/signin')}>Já possui uma conta? Entre!</ChangeAuthOp>
                    </Info>
                    <ReCAPTCHA 
                        sitekey="6LcLSJgcAAAAAPy5dNjbUcJ9icl_KAFj_gErN2p6"
                        onChange={onReCAPTCHAChange}/>
                    <ButtonLinear id="signupButton" disabled type="submit">Cadastrar</ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}