import { useState }  from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import { UserType } from '../../context/AuthContext';
import { firestore, firebase } from '../../services/firebase';
import { Content, Send } from './styles';

export default function SendMsg(props: {friend: UserType | undefined}){
    const { user } = useAuth();
    const [showEmoji, setShowEmoji] = useState(false);
    const [waitMsgDelay, setWaitMsgDelay] = useState(true);
    const [msg, setMsg] = useState('');

    const onEmojiClick = (event: any, emojiObject: IEmojiData) => {
        setMsg(msg + emojiObject.emoji);
    };

    async function sendMessage(){
        if(waitMsgDelay && user){
            if(msg.length){
                const now = new Date(firebase.firestore.Timestamp.now().seconds*1000)
                const messagesDiv = document.getElementById('messages');
                await firestore
                    .collection(`messages/${props.friend?user.id:'public'}/${props.friend?props.friend.id:'chat'}`)
                    .add({
                        createdAt: now,
                        createdBy: user.id,
                        text: msg
                    });
                setMsg('');
                messagesDiv!.scrollTop = messagesDiv!.scrollHeight;
                setWaitMsgDelay(false);
                setTimeout(() => {setWaitMsgDelay(true);}, 5000);
            }else{
                toast.error("Digite alguma coisa na mensagem!");
            }
        }else{
            toast.error("Espere 5 segundos para enviar uma nova mensagem!");
        }
    }

    return(
        <Content>
            {showEmoji&&<Picker pickerStyle={{position: 'absolute', top: '40%'}} onEmojiClick={onEmojiClick}/>}
            <button style={{backgroundColor: 'transparent'}} onClick={()=>setShowEmoji(!showEmoji)}>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
            </button>
            <input placeholder="Digite uma mensagem" value={msg} onKeyPress={(e)=>{e.key==='Enter' && sendMessage()}} onChange={(e)=>{setMsg(e.target.value)}} maxLength={516}/>
            <Send id="buttonSendMsg" onClick={()=>sendMessage()}>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
            </Send>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
        </Content>
    )
}