import styled from "styled-components";

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    bottom: 10px;
    left: 5px;

    svg{
        margin-right: 8px;
    }
`

export const ImgUpdate = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100%;

    input{
        background-color: transparent;
    }
`