import { useState, Dispatch, SetStateAction } from 'react';
import { slide as SliderUsers } from 'react-burger-menu';
import useAuth from '../../hooks/useAuth';
import UserCard from '../UserCard';
import { Content, Profile } from './styles';

const styles = {
    bmBurgerButton: {
        display: "none"
    },
    bmMenuWrap:{
        width: '26vw'
    },
    bmMenu: {
        background: '#373a47',
        fontSize: '1.15em',
        overflowY: 'hidden',
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
    }
}

type UsersProps = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    users: any
}

export default function UserInfo(props: UsersProps){
    const [friend, setFriend] = useState<typeof user>(undefined);
    const {user} = useAuth();

    const selectFriend = (friendSelect: typeof user)=> {
        setFriend(friendSelect);
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
            {friend?
            <Profile>
                <img src={friend.avatar} alt="Foto de perfil"/>
                <h1>{friend.name}</h1>
                <section>
                    <p>{friend.city}</p>
                    <p>{friend.age}</p>
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