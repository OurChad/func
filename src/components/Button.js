import styled from 'styled-components';

const Button = styled.button`
    background-color: var(--primary-color);
    border: 1px solid var(--primary-dark);
    border-radius: 4px;
    color: var(--primary-light);
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    font-size: 1.2rem;
    margin: 0;
    padding: 0.5rem;
    text-decoration: none;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

export default Button;
