import styled from "styled-components";

const Wrapper = styled.div`
    h1 {
        text-align: center;
        margin: 10px;
    }

    .details-section {
        display: flex;
        
        img {
            width: 800px;
            max-height: 500px;
        }

        p {
            margin: 0 20px;
        }
    }
    .contact-info {
        p {
            margin: 0;
        }
    }

    @media (max-width: 720px) {
        h1 {
            text-align: left;
            margin-left: 0;
        }
        .details-section {
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
