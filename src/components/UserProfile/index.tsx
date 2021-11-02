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
        fontSize: '1.15em'
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

    return(
        <Content>
            <SliderUsers styles={styles} isOpen={props.show}>
                <UserCard selectFriend={() => {
                        props.setFriend(undefined);
                        props.setShow(false)
                    }} user={undefined}
                />
                {Object.keys(props.users).map((key)=>{
                    return key!==user?.id?
                        <UserCard key={key} selectFriend={() => {
                                                props.setFriend({...props.users[key], id: key});
                                                props.setShow(false)
                                            }} user={props.users[key]}/>
                    :
                        null;
                })}
            </SliderUsers>
            {props.friend?
                <Profile>
                    {props.friend.avatar?<img src={props.friend.avatar} alt="Foto de perfil do amigo"/>:<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>}
                    <h1>{props.friend.name}</h1>
                    <section>
                        <p>Cidade: {props.friend.city}</p>
                        <p>Idade: {props.friend.age}</p>
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