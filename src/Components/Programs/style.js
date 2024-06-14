import styled from "styled-components";

const Wrapper = styled.div`
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

    .program-slider {
        display: flex;
        justify-content: space-between;
        
        .program-image {
            width: 40%;
            position: relative;
            img {
                height: 100%;
                width: 100%;
            }
        }

        .program-details {
            width: 60%;
            box-sizing: border-box;
            padding: 20px 30px 20px;

            h5, p {
                margin: 0;
            }

            h5 {
                text-align: center;
                margin-bottom:  15px;
            }

            p {
                font-size: 15px;
                text-align: justify;
                margin-bottom:  15px;
            }

            .arrows {
                display: flex;
                justify-content: space-between;

                button {
                    background: #0A0A0A;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            }
        }
    }

    @media (max-width: 720px) {
        margin-right: 0;
        .program-slider {
            display: block;

            .program-image {
                width: 100%;
            }

            .program-details {
                width: 100%;
            }
        }
    }
`;

export default Wrapper;
