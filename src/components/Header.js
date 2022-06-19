import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            <Brand>My Electron App</Brand>
        </StyledHeader>
    );
};

export default Header;

/******************************************************
    STYLES
******************************************************/

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--header-height);
    margin-bottom: 2rem;
    padding: 0 1rem;
    color: var(--primary);
    background: var(--bg-col-dark);
`;

const Brand = styled.div`
    flex-grow: 1;
    -webkit-app-region: drag;
    text-transform: uppercase;
    font-size: 14px;
    text-align: center;
`;
