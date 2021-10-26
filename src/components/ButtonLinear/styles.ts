import styled from "styled-components";

export const Button = styled.button`
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
    border: 1px solid #6049E4;
    background: transparent;
    color: #fff;

    :hover{
        box-shadow: 0 0 50px #6049E4;
        background: linear-gradient(180deg, #6049E4 0%, #7B6FC2 100%);
    }

    :disabled{
        opacity: 0.5;
        cursor: default;
    }
`