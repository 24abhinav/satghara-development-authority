import styled from 'styled-components';

const Wrapper = styled.div`
    .data-table {
        @media(max-width: 850px) {
            display: none;
        }
    }

    .action-button {
        button {
            border: none;
            background: transparent;
            cursor: pointer;
            margin-right: 5px;
            padding: 10px;
            border-radius: 5px;

            &:hover {
                background: #ededed;
            }
        }
    }
`;

export default Wrapper;