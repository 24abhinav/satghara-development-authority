import styled from 'styled-components';
export const typeColorMap = {
    success: {
        bgColor: '#008400bf',
        borderColor: 'green'
    },
    error: {
        bgColor: 'rgb(255 14 0 / 68%)',
        borderColor: 'rgb(255 13 0)'
    }
};

const Wrapper = styled.div`
    padding: 10px;
    ${({ type = 'success'}) => {
        const { bgColor, borderColor } = typeColorMap[type];
        return `
            background: ${bgColor};
            border-left: 3px solid ${borderColor};
        `
    }}

    p {
        margin: 0;
        color: white;
    }
`;

export default Wrapper;