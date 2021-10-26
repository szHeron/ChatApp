import React from "react";
import { Button } from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonLinear(props: ButtonProps){
    return(
        <Button disabled={props.disabled} id={props.id} type={props.type}>
            {props.children}
        </Button>
    )
}