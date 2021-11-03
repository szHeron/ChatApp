import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from "../../hooks/useAuth";
import ButtonLinear from "../../components/ButtonLinear";
import { ImgUpdate, BackButton } from './styles';
import { Content, Main, Form, ErrorInput, PersonInfo } from "../SignUp/styles";
import { Aside } from '../../styles/global';

type erros = {
    name: string,
    city: string,
    age: string
}

export default function ChangeProfileInfos(){
    const { user, setUser, ChangeUserInfos } = useAuth();
    const [newAvatar, setNewAvatar] = useState<File|null>();
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

        if(check && user?.id){
            if(!newAvatar){
                ChangeUserInfos();
            }
            ChangeUserInfos(newAvatar);
            history.push('/');
        }
    }

    function getImg() {
        if(user?.avatar){
            return user.avatar
        }
        return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjAuODIyIDE4LjA5NmMtMy40MzktLjc5NC02LjY0LTEuNDktNS4wOS00LjQxOCA0LjcyLTguOTEyIDEuMjUxLTEzLjY3OC0zLjczMi0xMy42NzgtNS4wODIgMC04LjQ2NCA0Ljk0OS0zLjczMiAxMy42NzggMS41OTcgMi45NDUtMS43MjUgMy42NDEtNS4wOSA0LjQxOC0zLjA3My43MS0zLjE4OCAyLjIzNi0zLjE3OCA0LjkwNGwuMDA0IDFoMjMuOTlsLjAwNC0uOTY5Yy4wMTItMi42ODgtLjA5Mi00LjIyMi0zLjE3Ni00LjkzNXoiLz48L3N2Zz4=";
    }

    return(
        <Content>
            <Aside>
                <img height="420" width="420" src="./FinishProfile.svg" alt="chat"/>
                <BackButton onClick={()=>history.push('/')}>
                    <svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/></svg>
                    Voltar
                </BackButton>
            </Aside>
            <Main>
                <h1>Editar perfil</h1>
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
                        <img height="100px" width="100px" src={getImg()} alt="foto de perfil"/>
                        <input onChange={e=>{e.target.files&&setNewAvatar(e.target.files[0])}} type="file" id="img" name="img" accept="image/*"/>
                    </ImgUpdate>
                    <ButtonLinear type='submit'>
                        SALVAR
                    </ButtonLinear>
                </Form>
            </Main>
        </Content>
    )
}