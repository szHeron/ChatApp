import { Dispatch, SetStateAction } from 'react';
import { slide as SliderUsers } from 'react-burger-menu'
import UserCard from '../UserCard';
import { Content } from "./styles";

type MessagesProps = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>;
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
                <UserCard name="Son Goku" online={false} avatarURL="https://i.pinimg.com/originals/82/38/0e/82380ef9ab658d334f4a5eae9265c286.jpg"/>
                <UserCard name="Vegeta" online avatarURL="https://i.pinimg.com/originals/82/38/0e/82380ef9ab658d334f4a5eae9265c286.jpg"/>
                <UserCard name="Freeza" online avatarURL="https://i.pinimg.com/originals/82/38/0e/82380ef9ab658d334f4a5eae9265c286.jpg"/>
                <UserCard name="Bills" online avatarURL="https://i.pinimg.com/originals/82/38/0e/82380ef9ab658d334f4a5eae9265c286.jpg"/>
                <UserCard name="Gohan" online={false} avatarURL="https://i.pinimg.com/originals/82/38/0e/82380ef9ab658d334f4a5eae9265c286.jpg"/>
            </SliderUsers>
        </Content>
    )
}