import styled from 'styled-components';

const Wrapper = styled.form`
    width: 300px;
    background: white;
    box-shadow: 0px 1px 3px 0px #9f9a9a;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;

    @media (max-width: 720px) {
        width: auto;
    }

    h3 {
        margin: 0;
        text-align: center;
        font-size: 12px;
        margin-bottom: 15px;
        color: #2a2929;
        font-family: sans-serif;
    }

    div {
        width: 100%;
    }

    button {
        width: 100%;
        border: none;
        background: #3a3ab1;
        color: white;
        border-radius: 2px;
        padding: 10px;
        cursor: pointer;

        &:disabled {
            background: #afafaf;
            cursor: not-allowed;
        }
    }
`;

export default Wrapper;