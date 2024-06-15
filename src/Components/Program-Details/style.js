import styled from "styled-components";

const Wrapper = styled.div`
    .details-section {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );

        .fixed-height {
            min-height: 240px;
            max-height: 300px;
            height: 100%;
        }
        
        img {}

        p {
            margin: 0;
            margin-left: 20px;
        }

        .contact-info {
            * {
                margin: 0;
            }
            display: flex;
            justify-content: flex-end;

            h3 {
                margin-bottom: 20px;
            }
        }
    }
`;

export default Wrapper;
