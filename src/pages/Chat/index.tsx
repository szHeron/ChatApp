import { useState, useEffect } from 'react';
import { database } from '../../services/firebase';
import { Content } from "./styles";
import HeaderChat from "../../components/HeaderChat";
import Messages from "../../components/Messages";
import SendMsg from "../../components/SendMsg";

export default function Chat(){
    const [show, setShow] = useState(false);
    const [userList, setUserList] = useState<any>();

    useEffect(()=>{
        const getUsersList = async ()=>{
            const users = database.ref('users').orderByChild('/name');
            users.on('value', (snapshot) => {
                setUserList(snapshot.val());
            });
        }
        getUsersList();
    },[])

    return(
        <Content>
            <HeaderChat setShow={setShow} show={show}/>
            {userList&&<Messages setShow={setShow} show={show} users={userList}/>}
            <SendMsg/>
        </Content>
    )
}