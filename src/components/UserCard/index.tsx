import { Card, Avatar } from './styles';

type UserProps = {
    name: string,
    avatarURL: string,
    online: boolean
}

export default function UserCard(props: UserProps){
    return(
        <Card>
            <Avatar>
                <img src={props.avatarURL} alt="foto de perfil"/>
                {props.online && <span/>}
            </Avatar>
            <div>
                <h1>{props.name}</h1>
                <p>1 Mensagem não visualizada</p>
            </div>
        </Card>
    )
}