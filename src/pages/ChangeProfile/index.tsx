import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from "../../hooks/useAuth";
import { Aside } from "../../styles/global";
import ButtonLinear from "../../components/ButtonLinear";
import { ImgUpdate } from './styles';
import { Content, Main, Form, ErrorInput, PersonInfo } from "../SignUp/styles";

type erros = {
    name: string,
    city: string,
    age: string
}

export default function ChangeProfileInfos(){
    const { user, setUser } = useAuth();
    const history = useHistory();
    const [erros, setErros] = useState<erros>({
        name: '',
        city: '',
        age: ''
    });

    const handleSubmit = async ()=>{
        let check = true;
        setErros({
            name: '',
            city: '',
            age: ''
        });

        if(!user?.name.trim()){
            check = false;
            setErros((erros)=>({...erros, name: "Campo nome obrigatorio!"}));
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

        }
    }

    return(
        <Content>
            <Aside>
                <img height="420" width="420" src="./FinishProfile.svg" alt="chat"/>
            </Aside>
            <Main>
                <h1>Finalizar perfil</h1>
                <Form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
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
                    <ImgUpdate>
                        {user?.avatar?
                            <img height="100px" width="100px" src={user.avatar} alt="foto de perfil"/>
                        :
                            <section/>
                        }
                        <input type="file" id="img" name="img" accept="image/*"/>
                    </ImgUpdate>
                    <ButtonLinear>
                        SALVAR
                    </ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}