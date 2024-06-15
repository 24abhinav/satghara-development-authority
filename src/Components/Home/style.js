import styled from 'styled-components';

const Wrapper = styled.div`

    .home-first-page {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: self-end;

        .programs-page {
            width: 800px;
            margin-right: 20px;
        }

        .contact-us-page {
            width: 300px;
        }

        @media (max-width: 1200px) {
            grid-template-columns: 1fr;
            justify-items: unset;

            .programs-page {
                width: auto;
                margin-right: 0;
            }
            .contact-us-page {
                width: auto;
            }
        }
    }


`;

export default Wrapper;