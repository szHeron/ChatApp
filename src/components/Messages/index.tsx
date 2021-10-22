import { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import useAuth from '../../hooks/useAuth';
import { UserType } from '../../context/AuthContext';
import { Content, SendMsg, ReceiveMsg } from './styles';

type Message = {
    id: string,
    text: string,
    createdAt: {
        seconds: number,
        nanoseconds: number
    }
}

export default function Messages(props: {friend: UserType|undefined}){
    const [messages, setMessages] = useState<any>();
    const { user } = useAuth();

    useEffect(()=>{
        if(user?.id){
            const unsubscribe = firestore
                .collection(`messages/${user.id}/${props.friend}`)
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot((querySnapshot)=>{
                    const data = querySnapshot.docs.map(doc=>({
                        ...doc.data(),
                        id: doc.id
                    }));
                    setMessages(data);
                    console.log(data, user.id, props.friend)
                });
            return unsubscribe;
        }
    },[])

    return(
        <Content>
            {messages&&messages.map((message: Message, index: number)=>(
                message.id===user?.id?
                    <SendMsg key={index}>
                        <p>{message.text}</p>
                        <span>{new Date(message.createdAt.seconds*1000).getHours()}:{new Date(message.createdAt.seconds*1000).getMinutes()}</span>
                    </SendMsg>
                :
                    <ReceiveMsg key={index}>
                        <p>{message.text}</p>
                        <span>{new Date(message.createdAt.seconds*1000).getHours()}:{new Date(message.createdAt.seconds*1000).getMinutes()}</span>
                    </ReceiveMsg>
            ))}
        </Content>
    )
}