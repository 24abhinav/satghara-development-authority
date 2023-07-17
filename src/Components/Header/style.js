import styled from 'styled-components';

const Wrapper = styled.div`
    height: 70px;
    box-sizing: border-box;
    padding: 10px 0;
    
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

        h3 {
            margin: 0;
            padding-left: 10px;
        }
    }

    .options {
        display: flex;
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
`;

export default Wrapper;