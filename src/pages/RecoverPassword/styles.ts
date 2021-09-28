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
    justify-content: space-between;
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

    p{
        align-self: center;
        color: #959494;
        font-weight: 300;
        text-align: center;
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

    section{
        width: 100%;
    }
`
