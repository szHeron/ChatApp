import { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import useAuth from '../../hooks/useAuth';
import { Content } from './styles';

type Message = {
    id: string,
    text: string,
    createdAt: Date
}

export default function Messages(){
    const [messages, setMessages] = useState<any>();
    const { user } = useAuth();

    useEffect(()=>{
        const unsubscribe = firestore
            .collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot((querySnapshot)=>{
                const data = querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id: doc.id
                }));
                setMessages(data);
            });
        return unsubscribe;
    })

    return(
        <Content>
            {messages.map((message: Message)=>(
                <p id={message.id}>{message.text}</p>
            ))}
        </Content>
    )
}