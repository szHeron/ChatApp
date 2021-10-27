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
        <Content id="messages">
            {(messages && props.usersList)&&messages.map((message: Message, index: number)=>(
                message.createdBy === user?.id?(
                    <SendMsg key={index}>
                        {(index === 0 || (messages[index-1].createdBy !== message.createdBy))&&
                            <Author>
                                {/*<p>{props.usersList[message.createdBy].name}</p>*/}
                                {props.usersList[message.createdBy].avatar?<img src={props.usersList[message.createdBy].avatar} alt="Autor da mensagem"/>:<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>}
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
                                {props.usersList[message.createdBy].avatar?<img src={props.usersList[message.createdBy].avatar} alt="Autor da mensagem"/>:<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>}
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