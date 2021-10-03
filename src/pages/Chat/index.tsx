import { useState } from 'react';
import { Content } from "./styles";
import HeaderChat from "../../components/HeaderChat";
import Messages from "../../components/Messages";
import SendMsg from "../../components/SendMsg";

export default function Chat(){
    const [show, setShow] = useState(false);
    return(
        <Content>
            <HeaderChat setShow={setShow} show={show}/>
            <Messages setShow={setShow} show={show}/>
            <SendMsg/>
        </Content>
    )
}