import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { Content, Main, Form, Info, Line, OtherLogin } from "./styles";

export default function SignUp(){
    return(
        <Content>
            <Aside>
                <img height="420" width="420" src="./OnlineChat.svg" alt="chat"/>
            </Aside>
            <Main>
                <h1>
                    Cadastro
                </h1>
                <Form>
                    <OtherLogin>
                        <img width="86" height="64" alt="teste"src="https://www.pngmagic.com/product_images/white-gradient-circle-png.png"/>
                        <img width="86" height="64" alt="teste"src="https://www.pngmagic.com/product_images/white-gradient-circle-png.png"/>
                    </OtherLogin>
                    <span>
                        <Line/>Ou<Line/>
                    </span>
                    <Info>
                        <div style={{width: '50%'}}>
                            <label>Nome</label>
                            <input type="text" style={{marginTop: '10px'}}/>
                        </div>
                        <div style={{width: '30%'}}>
                            <label>Cidade</label>
                            <input type="text" style={{marginTop: '10px'}}/>
                        </div>
                        <div style={{width: '10%'}}>
                            <label>Idade</label>
                            <input type="Number" min={0} max={120} style={{marginTop: '10px'}}/>
                        </div>
                    </Info>
                    <label>Email</label>
                    <input type="text"/>
                    <label>Senha</label>
                    <input style={{marginBottom: '25px'}} type="text"/>
                    <ButtonLinear type="submit">Cadastrar</ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}