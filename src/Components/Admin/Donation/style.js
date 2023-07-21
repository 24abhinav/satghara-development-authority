import styled from 'styled-components';

const Wrapper = styled.div`
    h3 {
        text-align: center;
    }

    .add-new {
        display: flex;
        justify-content: flex-end;
        
        button {
            background: #7777ea;
            border: none;
            color: white;
            padding: 10px 20px;
            cursor: pointer;

            span {
                &:nth-child(2) {
                    padding-left: 10px;
                }
            }
        }
    }
`;

export default Wrapper;