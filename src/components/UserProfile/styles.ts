import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    background: #9B5BF5;
    background: linear-gradient(#9B5BF5,#6049E4);
    width: 35vw;
    height: 100%;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 35px;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    height: 100%;

    section{
        display: flex;
        flex-direction: row;
    }
    
    h1{
        font-size: 2em;
        font-weight: 400;
    }

    img{
        width: 150px;
        height: 150px;
        border-radius: 15px;
    }
    span{
        width: 225px;
        height: 200px;
        border-radius: 15px;
        background-color: #363434;
    }
`