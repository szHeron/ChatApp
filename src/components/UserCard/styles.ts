import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    border-bottom:1px solid #dcdcdc;
    color: #fff;
    height: 70px;
    width: 100%;
    cursor: pointer;

    h1{
        margin: 0 0 10px 0;
        font-size: 1em;
    }

    p{
        margin:0;
        color: #9E9E9E;
        font-size: 0.7em;
    }
`

export const Avatar = styled.div`
    position:relative;
    display:inline-block;

    img{
        margin-right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }
    section{
        margin-right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background-color: #000;
    }
    span{
        width:8px;
        height:8px;
        background:#39ff14;
        position:absolute;
        bottom:10%;
        right:30%;
        border-radius:100%;
        z-index: 1;
    }
`
