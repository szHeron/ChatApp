import styled from "styled-components"

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    height: 10vh;
    width: 100%;
    background-color: #363434;
    color: #fff;

    button{
        cursor: pointer;
        border: none;
        background-color: transparent;
    }

    img{
        height: 48px;
        width: 48px;
        border-radius: 10px;
    }
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    p{
        margin: 0;
    }

    section{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 75px;
        margin-right: 15px;
    }
`

export const Logout = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    padding: 0 15px 0 0;
    width: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 1em;
    font-weight: 600;

    :hover{
        color: #dcdcdc;
    }
`