import { Card, Avatar } from './styles';

export default function UserCard(props: any){
    return(
        <Card onClick={()=>{props.onClick(props.user)}}>
            <Avatar>
                <img src={props.user.avatar} alt="foto de perfil"/>
                {props.user.online && <span/>}
            </Avatar>
            <div>
                <h1>{props.user.name}</h1>
                <p>1 Mensagem não visualizada</p>
            </div>
        </Card>
    )
}