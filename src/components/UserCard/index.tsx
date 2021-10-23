import { UserType } from '../../context/AuthContext';
import { Card, Avatar } from './styles';

export default function UserCard(props: { user: UserType|undefined, selectFriend: () => void, }){
    if(props.user)
        return(
            <Card onClick={()=>props.selectFriend()}>
                <Avatar>
                    <img src={props.user.avatar} alt="foto de perfil"/>
                    {props.user?.onlineState && <span>{props.user?.onlineState}</span>}
                </Avatar>
                <div>
                    <h1>{props.user.name}</h1>
                    <p>1 Mensagem não visualizada</p>
                </div>
            </Card>
        )
    return(
        <Card onClick={()=>props.selectFriend()}>
            <Avatar>
                <section/>
            </Avatar>
            <div>
                <h1>Servidor Geral</h1>
                <p>1 Mensagem não visualizada</p>
            </div>
        </Card>
    )
}