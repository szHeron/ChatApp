import React from "react";
import styled from "styled-components";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 200px;
    height: 50px;
    font-weight: 700;
    font-size: 1em;
    border-radius: 5px;
    border: none;
    background: #6049E4;
    background: linear-gradient(180deg, #6049E4 0%, #7B6FC2 100%);
    color: #fff;

    :disabled{
        opacity: 0.5;
        cursor: default;
    }
`

export default function ButtonLinear(props: ButtonProps){
    return(
        <Button disabled={props.disabled} id={props.id} type={props.type}>
            {props.children}
        </Button>
    )
}