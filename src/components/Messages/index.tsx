import useAuth from '../../hooks/useAuth';
import { Content } from './styles';


export default function Messages(){
    const {user} = useAuth();
    return(
        <Content>
            
        </Content>
    )
}