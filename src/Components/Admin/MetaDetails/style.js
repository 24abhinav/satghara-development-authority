import styled from 'styled-components';

const Wrapper = styled.div`
    .active {
        color: green;
        font-weight: bold;
    }
    .in-active {
        color: #9d1717;
    }

    .action-buttons {
        button {
            margin-right: 10px;
        }

        @media(max-width: 720px) {
            display: flex;
            flex-direction: column;
            align-items: center;

            button {
                margin: 0 0 10px 0;
                width: 5rem;
            }
        }
    }
`;

export default Wrapper;