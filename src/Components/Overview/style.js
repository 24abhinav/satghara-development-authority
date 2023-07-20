import styled from 'styled-components';

const Wrapper = styled.div`
    h4 {
        margin: 0;
        font-size: 25px;
        font-family: sans-serif;
        text-align: center;
    }

    .tiles {
        display: flex;
        justify-content: center;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 3px #9b9b9b;
            margin-right: 20px;

            span {
                &:nth-child(1) {
                    padding-bottom: 20px;
                    font-family: sans-serif;
                }
            }
        }

        @media (max-width: 425px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;

            div {
                margin-bottom: 10px;
                margin-right: 0;
            }
        }
    }

    .overview-section {
        display: flex;
        justify-content: space-between;
    }
`;

export default Wrapper;