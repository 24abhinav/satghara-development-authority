import styled from 'styled-components';

const Wrapper = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    border-radius: 5px;

    &:hover {
        background: #ededed;
    }

    span {
        &:nth-child(2) {
            padding-left: 5px;
        }
    }
`;

export default Wrapper;