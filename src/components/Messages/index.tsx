import { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import useAuth from '../../hooks/useAuth';
import { UserType } from '../../context/AuthContext';
import { Author, Content, SendMsg, ReceiveMsg, TextArea } from './styles';

type Message = {
    id: string,
    text: string,
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    createdBy: string
}

export default function Messages(props: { friend: UserType|undefined, usersList: any }){
    const [ messages, setMessages ] = useState<any>();
    const { user } = useAuth();

    useEffect(()=>{
        if(user?.id){
            const unsubscribe = firestore
                .collection(`messages/${props.friend?user.id:'public'}/${props.friend?props.friend.id:'chat'}`)
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
        }
    },[props.friend, user])

    const MsgDate = (date: Date) => {
        return <span> {date.getHours()}:{date.getMinutes() < 10?'0':''}{date.getMinutes()}</span>
    }

    return(
        <Content>
            {(messages && props.usersList)&&messages.map((message: Message, index: number)=>(
                message.createdBy === user?.id?(
                    <SendMsg key={index}>
                        {(index === 0 || (messages[index-1].createdBy !== message.createdBy))&&
                            <Author>
                                {/*<p>{props.usersList[message.createdBy].name}</p>*/}
                                <img src={props.usersList[message.createdBy].avatar} alt="Autor da mensagem"/>
                            </Author>
                        }
                        <TextArea>
                            <p>{message.text}</p>
                            {MsgDate(new Date(message.createdAt.seconds*1000))}
                        </TextArea>
                    </SendMsg>
                ):(
                    <ReceiveMsg key={index}>
                        {(index === 0 || (messages[index-1].createdBy !== message.createdBy))&&
                            <Author>
                                {/*<p>{props.usersList[message.createdBy].name}</p>*/}
                                <img src={props.usersList[message.createdBy].avatar} alt="Autor da mensagem"/>
                            </Author>
                        }
                        <TextArea>
                            <p>{message.text}</p>
                            {MsgDate(new Date(message.createdAt.seconds*1000))}
                        </TextArea>
                    </ReceiveMsg>
                )
            ))}
        </Content>
    )
}