import styled from 'styled-components';

const Button = ({ className, handleClick, children }) => {
    return (
        <StyledButton onClick={handleClick} className={className}>
            {children}
        </StyledButton>
    );
};

export default Button;

/******************************************************
    STYLES
******************************************************/

const StyledButton = styled.button`
    appearance: none;
    text-decoration: none;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-size: 0.875rem;
    color: var(--primary);
    background-color: var(--back-col);
    border: 1px solid currentColor;
    transition: color 0.3s;
    cursor: pointer;
    outline: none;
    &:hover {
        color: var(--font-col);
    }
`;
