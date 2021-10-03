import { useContext, useState } from 'react';
import { useHistory } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import ButtonLinear from '../../components/ButtonLinear';
import { Aside } from "../../styles/global";
import { Line, ErrorInput } from '../SignUp/styles';
import { Content, Main, Form } from "./styles";
import { ForgetPassword } from '../SignIn/styles';

export default function SignUp(){
    const { resetPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();


    const handleSubmit = ()=>{
        const validateEmail = /\S+@\S+\.\S+/;

        if(email.trim() || !validateEmail.test(email)){
            setError("Por favor, insira um email válido!");
            return;
        }

        resetPassword(email);
    }

    return (
        <Content>
            <Aside>
                <img height="420" width="420" src="./OnlineChat.svg" alt="chat"/>
            </Aside>
            <Main>
            <h1>Recuperar senha</h1>
                <Form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
                    <p>
                        insira seu endereço de e-mail e nós lhe enviaremos um link para redefinir sua senha
                    </p>
                    <section>
                        <label>Email</label>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
                        {error && <ErrorInput style={{color:'#f00'}}>{error}</ErrorInput>}
                    </section>
                    <ButtonLinear>RECUPERAR</ButtonLinear>
                    <span>
                        <Line/>ou<Line/>
                    </span>
                    <ForgetPassword style={{alignSelf: 'center'}} onClick={()=>history.push(`/signup`)}>Crie uma nova conta!</ForgetPassword>
                </Form>
            </Main>
        </Content>
    )
}