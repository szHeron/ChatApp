import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { Content, Main, Form, Line, OtherLogin } from "./styles";

export default function SignIn(){
    return(
        <Content>
            <Aside>
                <img height="420" width="420" src="./OnlineChat.svg" alt="chat"/>
            </Aside>
            <Main>
                <h1>
                    Login
                </h1>
                <Form>
                    <label>Email</label>
                    <input type="text"/>
                    <label>Senha</label>
                    <input type="text"/>
                    <a>Esqueceu a senha?</a>
                    <ButtonLinear type="submit">Entrar</ButtonLinear>
                    <span>
                        <Line/>Ou<Line/>
                    </span>
                    <OtherLogin>
                        <img width="86" height="64" alt="teste"src="https://www.pngmagic.com/product_images/white-gradient-circle-png.png"/>
                        <img width="86" height="64" alt="teste"src="https://www.pngmagic.com/product_images/white-gradient-circle-png.png"/>
                    </OtherLogin>
                </Form>
            </Main>
        </Content>
    )
}