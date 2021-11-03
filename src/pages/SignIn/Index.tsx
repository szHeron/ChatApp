import { useState } from "react";
import { useHistory } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ErrorInput, PasswordVisibility } from "../SignUp/styles";
import { Content, Main, Form, Line, OtherLogin, ForgetPassword, ChangeAuthOp } from "./styles";

type erros = {
    email: string,
    password: string,
    auth: string | undefined
}

export default function SignIn(){
    const { user, setUser, signInWithEmailAndPassword, signInWithGoogle } = useAuth();
    const [erros, setErros] = useState<erros>({email: '', password: '', auth: ''});
    const [showPassword, setShowPassword] = useState(false);
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
                    <input value={user?.password} onChange={(e)=>setUser({...user, password:e.target.value})} type={showPassword?'text':'password'}/>
                    <PasswordVisibility style={{width: '24px', marginTop: '-36px'}} onClick={()=>setShowPassword(!showPassword)}>
                        {
                            showPassword?
                                <svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"/></svg>
                            :
                                <svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg>
                            
                        }
                    </PasswordVisibility>
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