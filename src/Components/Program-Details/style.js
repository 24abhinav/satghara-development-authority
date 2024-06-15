import styled from "styled-components";

const Wrapper = styled.div`
    .details-section {
        display: flex;
        
        img {
            width: 800px;
            max-height: 500px;
        }

        p {
            margin: 0 20px;
        }

        .contact-info {
            * {
                margin: 0;
            }

            h3 {
                margin-bottom: 20px;
            }
        }

        /* @media (max-width: 1100px) {
            grid-template-columns: 1fr 1fr;

            .contact-info {
                display: block;
                margin-top: 20px;
            }

            img {
                width: 100%;
            }
        } */

        @media (max-width: 720px) {
            display: block;

            p {
                margin: 0;
            }

            img {
                width: 100%;
            }
        }
    }
`;

export default Wrapper;
