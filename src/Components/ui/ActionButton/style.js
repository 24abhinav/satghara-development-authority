import styled from 'styled-components';

const Wrapper = styled.button`
    border: none;
    cursor: pointer;
    margin-right: 10px;
    background: transparent;

    span {
        &:nth-child(2) {
            padding-left: 5px;
        }
    }

    &:hover {
        background: #092b3f;
        color: white;
    }
`;

export default Wrapper;