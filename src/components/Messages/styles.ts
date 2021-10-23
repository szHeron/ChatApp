import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #211F1F;
    word-break: break-all;
    overflow-y: scroll;
    width: 100%;
    height: 100%;

    div{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        color: #fff;
        max-width: 50%;
        min-width: 10%;
        padding: 8px;
        padding-right: 15px;
        padding-left: 15px;
        border-radius: 20px;
        margin-top: 10px;
        margin-right: 10px;

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
    }

    &::-webkit-scrollbar {
        width: 12px;
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

export const SendMsg = styled.div`
    background: rgb(96,73,228);
    background: linear-gradient(90deg, rgba(96,73,228,1) 0%, rgba(160,69,201,1) 100%);
    align-self: flex-end;
`

export const ReceiveMsg = styled.div`
    background-color: #898989;
    align-self: flex-start;
`