import styled from 'styled-components';

const Wrapper = styled.div`

    .home-first-page {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;

        .programs-page {
            width: 800px;
            /* margin-right: 20px; */
        }

        .contact-us-page {
            
        }

        @media (max-width: 1200px) {
            .programs-page {
                width: 600px;
            }
        }

        @media (max-width: 1100px) {
            display: block;

            .programs-page {
                width: auto;
            }
        }
    }


`;

export default Wrapper;