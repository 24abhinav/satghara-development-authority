import styled from 'styled-components';

const Wrapper = styled.div`
    width: calc(100% - 450px);
    padding: 1rem;
    border-width: inherit;
    border-left-width: 3px;
    border-style: solid;
    border-image: 
        linear-gradient(
        to bottom, 
        red, 
        rgba(0, 0, 0, 0)
        ) 1 100%;
    

    h4 {
        margin: 0;
        text-align: center;
    }

    .overview {
        display: flex;
        align-items: center;
        position: relative;

        img {
            width: 350px;
            height: 300px;
            min-width: 350px;
            min-height: 300px;
        }

        .program-details {
            padding-left: 20px;
            p {
                margin: 0;
                line-height: 20px;
                font-size: 15px;
            }
        }

        .upcoming-flag {
            position: absolute;
            top: 17px;
            left: -17px;
            margin: 0;
            background: red;
            color: white;
            padding: 6px 17px;
            transform: rotate(315deg);
            font-size: 13px;
        }
    }

    .change-program-btn {
        margin-top: 25px;
        display: flex;
        justify-content: center;

        button {
            border: 1px solid #337EFE;
            background: transparent;
            border-radius: 50%;
            cursor: pointer;
            font-size: 25px;
            width: 50px;
            height: 50px;


            &:hover {
                background: #337EFE;
                color: white;
            }
        }

        button:nth-child(2) {
            margin-left: 20px;
        }
    }

    @media (max-width: 720px) {
        width: auto !important;
    }

    @media (max-width: 1290px) {
        .overview {
            flex-direction: column;
        }
    }

    @media (max-width: 960px) {
        width: 50%;

        img {
            width: 100% !important;
            height: 300px !important;
            min-width: unset !important;
            min-height: 300px;
        }
    }
`;

export default Wrapper;