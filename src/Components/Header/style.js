import styled from 'styled-components';

const Wrapper = styled.header`
    height: 70px;
    box-sizing: border-box;
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 0.5px solid #0d0c1c;
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .heading {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 15px;
        font-weight: 600;
        font-family: monospace;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        h3 {
            margin: 0;
            padding-left: 10px;
        }
    }

    .options {
        display: flex;
        align-items: center;
        list-style-type: none;
        padding: 0;
        margin: 0;

        
        @media (max-width: 720px) {
            display: none;
        }

        li {

            margin-left: 30px;
            a {
                text-decoration: none;
                font-weight: 500;
                font-family: monospace;
                font-size: 15px;
                color: #3A83FD;

                &:hover, &:visited, &:focus, &:active {
                    color: #3A83FD;
                }
            }

            .active {
                text-decoration: underline;
                font-weight: 600;
            }

            select {
                border: none;
                background: transparent;
            }
        }
    }

    .mobile-icon {
        display: none;
        @media (max-width: 720px) {
            display: block;
        }
        .hamburger {
            div {
                width: 35px;
                height: 5px;
                background-color: black;
                margin: 6px 0;
            }
        }
    }

    .mobile-header {
        background: rgba(0,0,0, 0.5);
        width: 100vw;
        position: absolute;
        bottom:0;
        left:0;
        z-index: 9;
        transition: visibility 0s, height 0.2s ease-in;

        ${({ $mobileHeader }) => `
            height: ${$mobileHeader ? '100vh' : '0'};
            display: ${$mobileHeader ? 'block' : 'none'};
        `}

        .mobile-options {
            position: absolute;
            top: 0px;
            width: 100vw;
            background: white;
            padding: 80px 0px 20px;
            border-radius: 0px 0px 20px 20px;

            .options {
                display: flex;
                flex-direction: column;
                align-items: center;

                li {
                    margin: 0;
                    padding-bottom: 15px;
                }
            }
        }
    }
`;

export default Wrapper;
