import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #211F1F;
    width: 100%;
    height: 100%;

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: #fff;
        max-width: 50%;
        min-width: 10%;
        padding: 7px;
        border-radius: 20px;
        margin-top: 10px;
        margin-right: 10px;

        span{
            align-self: flex-end;
            color: #d3d3d3;
            font-size: 14px;
            font-weight: 300;
            margin: 0;
        }
        p{
            margin: 0;
        }
    }
`

export const SendMsg = styled.div`
    background: rgb(96,73,228);
    background: linear-gradient(90deg, rgba(96,73,228,1) 0%, rgba(160,69,201,1) 100%);
    align-self: flex-end;
`

export const ReceiveMsg = styled.p`
    background-color: #898989;
    align-self: flex-start;
`