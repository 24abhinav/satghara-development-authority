import styled from 'styled-components';

const Wrapper = styled.div`
   .action-btn {
        button {
            border: none;
            cursor: pointer;
            margin-right: 10px;
            background: transparent;
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

   .contact-list {
     display: block;

     table {
          @media(max-width: 720px) {
            display: none;
          }
     }
   }

   .no-data {
     text-align: center;
   }
`;

export default Wrapper;