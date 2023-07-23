import styled from 'styled-components';

const GlobalStyle = styled.div`
    width: 100%;

    .m-b-10 {
        margin-bottom: 10px;
    }
    .m-b-15 {
        margin-bottom: 15px;
    }
    .m-b-20 {
        margin-bottom: 20px;
    }

    .m-r-20 {
        margin-right: 20px;
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

        input, textarea, select {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border:solid 1px #ccc;
            border-radius: 5px;
            resize: none;

            &:focus {
                outline: none;
            }
        }

        .error-msg {
            font-size: 12px;
            padding-left: 11px;
            color: #e54444;
            display: block;
        }

        .input-error {
            border-color: #e54444;
        }
    }

    .link-active {
        text-decoration: underline !important;
    }

    .primary-btn {
        border: none;
        background: #4e4edb;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
    }

    .icon-btn {
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
    }

    .danger {
        background: #950101;
    }

    button {
        &:disabled {
            background: #afafaf !important;
            cursor: not-allowed !important;
        }
    }

    .mobile-list {
     display: none;

     @media(max-width: 720px) {
        display: block;
     }

     ul {
          padding: 0;
          list-style-type: none;
          border-bottom: 1px solid #6f6f6f;

          li {
               display: flex;
               justify-content: space-between;
               align-items: center;
               margin-bottom: 10px;

               &:hover {
                    background-color: #dddddd;
               }

               span {
                    display: block;

                    &:nth-child(2) {
                       text-align: right;
                    }
               }
          }
     }
   }
`;

export default GlobalStyle;