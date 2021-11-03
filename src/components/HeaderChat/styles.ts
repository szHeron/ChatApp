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

    svg{
        cursor: pointer;
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
        align-items: flex-end;
        width: 200px;
        margin-right: 15px;
    }

    img{
        cursor: pointer;
    }

    img:hover{
        transform:scale(1.1);
        transition: 1s;
    }
`

export const Logout = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    width: 70px;
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