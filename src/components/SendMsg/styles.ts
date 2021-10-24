import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    height: 10vh;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    background-color: #363434;
    color: #fff;
    margin: 0;

    input{
        height: 25px;
        width: 100%;
        padding-left: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 15px;
        border: none;
    }

    input:focus{
        outline: none;
    }
    
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
    }
`

export const Send = styled.button`
    height: 40px;
    width: 45px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #6049E4;
`