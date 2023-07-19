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

    .loader {
        border: 5px solid #f3f3f3;
        border-radius: 50%;
        border-top: 5px solid #3498db;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
        width: 50px;
        height: 50px;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default Wrapper;