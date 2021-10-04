import { Dispatch, SetStateAction } from 'react';
import { slide as SliderUsers } from 'react-burger-menu'
import UserCard from '../UserCard';
import { Content } from "./styles";

type MessagesProps = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    users: any
}

const styles = {
    bmBurgerButton: {
        display: "none"
    },
    bmMenu: {
        background: '#373a47',
        fontSize: '1.15em',
        overflowY: 'hidden'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
    }
}

export default function Messages(props: MessagesProps){
    return(
        <Content>
            <SliderUsers styles={styles} isOpen={props.show}>
                {Object.keys(props.users).map((key)=>{
                    return <UserCard name={props.users[key].name} online={props.users[key].online} avatarURL={props.users[key].avatar}/>
                })}
            </SliderUsers>
        </Content>
    )
}