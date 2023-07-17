import styled from 'styled-components';

const GlobalStyle = styled.div`

    .m-b-10 {
        margin-bottom: 10px;
    }
    .m-b-15 {
        margin-bottom: 15px;
    }
    .m-b-20 {
        margin-bottom: 20px;
    }


    .form-field {
        margin-bottom: 1rem;
        label {
            display: block;
            margin-bottom: 5px;
            font-size: 15px;
            font-weight: 400;
            color: #4f4f4f;

            .asterisk {
                color: #e54444;
            }
        }

        input {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border:solid 1px #ccc;
            border-radius: 5px;

            &:focus {
                outline: none;
            }
        }

        .error-msg {
            font-size: 12px;
            padding-left: 11px;
            color: #e54444;
        }

        .input-error {
            border-color: #e54444;
        }
    }
`;

export default GlobalStyle;