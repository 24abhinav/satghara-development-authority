import styled from 'styled-components';
import { typeColorMap } from '../Alert/style';

const Wrapper = styled.div`
    padding: 10px;
    position: fixed;
    width: 230px;
    border-radius: 5px;
    top: 16px;
    right: 16px;
    ${({ type = 'success'}) => {
        const { borderColor } = typeColorMap[type];
        return `
            background: ${type === 'success' ? 'black' : 'red'};
            border-left: 3px solid ${borderColor};
        `
    }}

    p {
        margin: 0;
        color: white;
    }

    @media (max-width: 420px) {
        width: 85%;
    }
`;

export default Wrapper;