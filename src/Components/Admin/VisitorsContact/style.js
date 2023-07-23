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