import { Dispatch, SetStateAction } from 'react';
import { slide as SliderUsers } from 'react-burger-menu';
import useAuth from '../../hooks/useAuth';
import UserCard from '../UserCard';
import { UserType } from '../../context/AuthContext';
import { Content, Profile } from './styles';

const styles = {
    bmBurgerButton: {
        display: "none"
    },
    bmMenuWrap:{
        width: '26vw',
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

type UsersProps = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    users: any,
    setFriend: Dispatch<SetStateAction<UserType|undefined>>,
    friend: UserType|undefined
}

export default function UserInfo(props: UsersProps){
    const {user} = useAuth();

    const selectFriend = (friendSelect: UserType)=> {
        props.setFriend(friendSelect);
        props.setShow(false)
    }

    return(
        <Content>
            <SliderUsers styles={styles} isOpen={props.show}>
                {Object.keys(props.users).map((key)=>{
                    return key!==user?.id?
                    <UserCard key={key} onClick={selectFriend} user={props.users[key]}/>
                    :
                    null;
                })}
            </SliderUsers>
            {props.friend?
            <Profile>
                <img src={props.friend.avatar} alt="Foto de perfil"/>
                <h1>{props.friend.name}</h1>
                <section>
                    <p>{props.friend.city}</p>
                    <p>{props.friend.age}</p>
                </section>
            </Profile>
            :
            <Profile>
                <span/>
                <p>Chat geral</p>
            </Profile>
            }
        </Content>
    )
}