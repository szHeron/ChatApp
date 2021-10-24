import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    word-break: break-all;
    overflow-y: scroll;
    max-width: 100%;
    width: 100%;
    height: 100%;
    background-color: #211F1F;
    color: #fff;
    margin: 0;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #363636;
        border-radius: 20px;
        border: 0;
    }
`

export const Author = styled.div`
    img{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`

export const TextArea = styled.section`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 8px;
    padding-right: 15px;
    padding-left: 15px;
    border-radius: 20px;

    span{
        align-self: flex-end;
        color: #d3d3d3;
        font-size: 0.8em;
        font-weight: 300;
        margin: 4px 0 0 0;
    }

    p{
        font-size: 1em;
        margin: 0;
    }
`

export const SendMsg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: flex-end;
    max-width: 50%;
    min-width: 10%;
    margin-top: 10px;
    margin-right: 10px;

    section{
        background: linear-gradient(90deg, rgba(96,73,228,1), rgba(160,69,201,1));
    }
`

export const ReceiveMsg = styled(SendMsg)`
    align-items: flex-start;
    align-self: flex-start;
    margin-left: 10px;

    section{
        background: #898989;
    }
`