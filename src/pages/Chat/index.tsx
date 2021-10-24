import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { database } from '../../services/firebase';
import useAuth from '../../hooks/useAuth';
import { Content, MessageArea, Channel } from './styles';
import HeaderChat from '../../components/HeaderChat';
import Messages from '../../components/Messages';
import SendMsg from '../../components/SendMsg';
import UserProfile from '../../components/UserProfile';

export default function Chat(){
    const { user } = useAuth();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [userList, setUserList] = useState<any>();
    const [friend, setFriend] = useState<typeof user>(undefined);

    useEffect(()=>{
        const getUsersList = async ()=>{
            const users = database.ref('users').orderByChild('/name');
            users.on('value', (snapshot) => {
                setUserList(snapshot.val());
            });
        }
        getUsersList();
        if(!user?.city.trim() || user?.age < 3){
            console.log(user)
            history.push("/changeprofile")
        }
    },[user?.city, user?.age])

    return(
        <Content>
            <HeaderChat setShow={setShow} show={show}/>
            <MessageArea>
                {userList&&<UserProfile setShow={setShow} show={show} users={userList} setFriend={setFriend} friend={friend}/>}
                <Channel>
                    <Messages friend={friend} usersList={userList}/>
                    <SendMsg friend={friend}/>
                </Channel>
            </MessageArea>
        </Content>
    )
}