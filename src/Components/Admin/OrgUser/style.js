import styled from 'styled-components';

const Wrapper = styled.div`
    .data-table {
        @media(max-width: 720px) {
            display: none;
        }
    }

    .action-button {
        button {
            border: none;
            background: transparent;
            cursor: pointer;
            margin-right: 5px;

            &:hover {
                background: grey;
            }
        }
    }
`;

export default Wrapper;