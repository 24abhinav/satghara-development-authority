import styled from 'styled-components';
export const typeColorMap = {
    success: {
        bgColor: '#c3f3d7',
        borderColor: '#2ed573',
        color: '#23ad5c'
    },
    error: {
        bgColor: '#ffe0e3',
        borderColor: '#ff4757',
        color: '#ff4757'
    }
};

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;

    ${({ type = 'success'}) => {
        const { bgColor, borderColor, color } = typeColorMap[type];
        return `
            background: ${bgColor};
            border-left: 6px solid ${borderColor};

            p {
                margin: 0;
                color: ${color};
                font-size: 14px;
                line-height: 20px;
                text-align: justify;
                padding-right: 1rem;
            }

            i {
                color: ${color};
                cursor: pointer;
            }
        `
    }}
`;

export default Wrapper;