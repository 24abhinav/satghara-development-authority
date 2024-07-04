import styled from 'styled-components';

const GlobalStyle = styled.div`
    width: 100%;

    .select {
        border: none;
        padding: 10px;
    }

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

    .router-component {
        display: flex;
        justify-content: center;
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

    .btn {
        border: none;
        background: transparent;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
    }

    .icon-btn {
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
    }

    button {
        &:disabled {
            background: #afafaf !important;
            cursor: not-allowed !important;
        }
    }

    .mobile-list {
     display: none;

     @media(max-width: 850px) {
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

   .filter-section {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 720px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;

          .form-field {
               margin-right: 0;
          }
        }

        @media (min-width: 720px) {
          .form-field {
               margin-bottom: 0;
          }
        }

        .active-check {
          display: flex;
          align-items: center;

          input {
               width: auto;
          }

          label {
               margin: 0;
          }
        }
   }

   .no-data {
        text-align: center;
        font-weight: bold;
   }

   .d-flex {
        display: flex;
   }

   .j-center {
        justify-content: center;
   }

   .j-space-between {
        justify-content: space-between;
   }
   .a-center {
        align-items: center;
   }

   .cards {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
        grid-gap: 10px;

        .card {
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
            border-radius: 5px;
            position: relative;

            small {
                background: #14145d;
                color: white;
                padding: 5px 15px;
                border-radius: 5px;
                position: absolute;
                top: 5px;
                right: 5px;
            }

            img {
                width: 100%;
                border-radius: 5px;
                max-height: 150px;
            }

            .details {
                padding: 10px;

                h4 {
                    margin: 0;
                }

                p {
                    line-height: 20px;
                    text-align: justify;
                    max-height: 100px;
                    overflow: auto;
                }
            }
        }
   }

   .link {
        background: #0a386f;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
   }

    .success {
        background: green;
    }

    .primary {
        background: #4e4edb;
    }

    .danger {
        background: #700b0b;
    }

    .warning {
        background: #767610;
    }

   .chip {
        color: white;
        padding: 3px 10px;
        border-radius: 15px;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    form {
        select {
            width: 100%;
            padding: 10px;
            border: solid 1px #ccc;
            border-radius: 5px;
        }
    }

    .social-media {
       position: fixed;
       right: 0;

       i {
          color: white;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .facebook {
            background: #0766ff;
        }
    }
`;

export default GlobalStyle;
