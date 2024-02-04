import styled from 'styled-components';

export const Button = styled.button`
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    font-weight: bold;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;
