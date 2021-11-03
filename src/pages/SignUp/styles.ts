import styled from "styled-components"

export const Content = styled.div`
    display: flex;
    flex-direction: row;
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 60%;
    background-color: #363434;
    font-family: 'Inter', sans-serif;

    h1{
        color: #fff;
        font-weight: 600;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 75%;
    width: 75%;
    padding: 30px;
    background-color: #2A1E2F80;
    border-radius: 15px;

    label{
        color: #fff;
        margin-top: 20px;
        margin-bottom: 5px;
        font-weight: 300;
    }

    a{
        align-self: end;
        margin-top: 15px;
        color: #D45FF1;
    }

    input{
        width: 100%;
        height: 30px;
        background-color: #B39CE5;
        color: #fff;
        font-size: 1em;
        font-weight: 300;
        border: none;
        border-radius: 5px;
    }

    span{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        color: #fff;
    }
`

export const PasswordVisibility = styled.span`
    float: right;
    margin-left: 95%;
    margin-top: -26px;
    position: relative;
    cursor: pointer;
`

export const PersonInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
`

export const Line = styled.hr`
    width: 260px;
    color: #9A9898;
`

export const ErrorInput = styled.span`
    margin: 0;
    font-weight: 200;
    font-size: 0.8em;
`

export const OtherLogin = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    margin-top: 15px;
    width: 100%;

    img{
        padding: 5px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
    }

    button{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        border: none;
        border-radius: 5px;
        width: 40%;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #444EEA;
        color: #fff;
        cursor: pointer;
    }
    p{
        margin-left: 20px;
    }
`