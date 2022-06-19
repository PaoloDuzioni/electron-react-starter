import { useState } from 'react';
import styled from 'styled-components';

const Help = () => {
    const [showHelp, setShowHelp] = useState(false);

    // Detect help keyboard shortcut
    window.electronAPI.detectHelpShortcut(() => {
        setShowHelp(!showHelp);
    });

    return showHelp ? (
        <StyledHelp>
            <Contents>
                <Title>Help tooltip</Title>
                <Text>
                    In this area you can display the <strong>help</strong>{' '}
                    instructions for your app.
                </Text>
                <Text>
                    You can use the keyboard shortcut <code>ctrl/cmd + H</code>{' '}
                    per chiudere questo tooltip.
                </Text>
            </Contents>
        </StyledHelp>
    ) : null;
};

export default Help;

/******************************************************
    STYLES
******************************************************/

const StyledHelp = styled.div`
    position: absolute;
    top: var(--header-height);
    right: 0;
    width: 200px;
    padding: 0.5rem;
    background-color: var(--primary);
`;

const Contents = styled.div`
    color: var(--bg-col);
`;

const Title = styled.h4`
    font-size: 16px;
    margin-bottom: 0.5rem;
`;

const Text = styled.p`
    font-size: 14px;
    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;
