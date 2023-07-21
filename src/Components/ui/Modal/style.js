import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        padding: 20px;
        background: white;
        border-radius: 5px;
        min-width: 300px;

        .modal-btn {
            border-top: 1px solid black;
            padding-top: 10px;
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;

            button {
                border: none;
                padding: 10px;
                color: white;
                border-radius: 3px;
                cursor: pointer;

                &:nth-child(1) {
                    background: #e53d3d;
                }
                
                &:nth-child(2) {
                    background: purple;
                    margin-left: 20px;
                }
            }
        }
    }
`;

export default Wrapper;