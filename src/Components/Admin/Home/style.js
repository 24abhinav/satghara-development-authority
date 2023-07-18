import styled from 'styled-components';

const Wrapper = styled.div`
    .admin {
        nav {
            ul {
                display: flex;
                list-style-type: none;
                padding: 0;

                li {
                    margin-right: 20px;

                    a {
                        text-decoration: none;
                    }
                }
            }
        }
    }
`;

export default Wrapper;