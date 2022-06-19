import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useNetwork from '../hooks/useNetwork';

const Footer = () => {
    const [isFull, setIsFull] = useState(false);
    const status = useNetwork() ? 'online' : 'offline';

    const toggleFullScreen = () => setIsFull(!isFull);

    // When isFull is completely updated
    useEffect(() => {
        window.electronAPI.setFullScreen(isFull);
    }, [isFull]);

    return (
        <StyledFooter>
            <LeftSide>Copyright &copy;{new Date().getFullYear()}</LeftSide>
            <RightSide>
                <FullscreenBtn
                    onClick={toggleFullScreen}
                    title="Toggle Full Screen"
                >
                    {isFull ? (
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M128 320H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32v-96C160 334.3 145.7 320 128 320zM416 320h-96c-17.69 0-32 14.31-32 32v96c0 17.69 14.31 32 32 32s32-14.31 32-32v-64h64c17.69 0 32-14.31 32-32S433.7 320 416 320zM320 192h96c17.69 0 32-14.31 32-32s-14.31-32-32-32h-64V64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96C288 177.7 302.3 192 320 192zM128 32C110.3 32 96 46.31 96 64v64H32C14.31 128 0 142.3 0 160s14.31 32 32 32h96c17.69 0 32-14.31 32-32V64C160 46.31 145.7 32 128 32z" />
                        </Svg>
                    ) : (
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M128 32H32C14.31 32 0 46.31 0 64v96c0 17.69 14.31 32 32 32s32-14.31 32-32V96h64c17.69 0 32-14.31 32-32S145.7 32 128 32zM416 32h-96c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32V64C448 46.31 433.7 32 416 32zM128 416H64v-64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96c0 17.69 14.31 32 32 32h96c17.69 0 32-14.31 32-32S145.7 416 128 416zM416 320c-17.69 0-32 14.31-32 32v64h-64c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c17.69 0 32-14.31 32-32v-96C448 334.3 433.7 320 416 320z" />
                        </Svg>
                    )}
                </FullscreenBtn>
                <ConnectionStatus
                    className={status}
                    title={`You are currently ${status}`}
                >
                    {status}
                </ConnectionStatus>
            </RightSide>
        </StyledFooter>
    );
};

export default Footer;

/******************************************************
    STYLES
******************************************************/

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 1rem;
`;

const LeftSide = styled.div`
    font-size: 0.875rem;
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
`;

const FullscreenBtn = styled.button`
    appearance: none;
    margin-right: 1rem;
    border: 0;
    background: none;
    cursor: pointer;
`;

const Svg = styled.svg`
    display: block;
    width: 15px;
    fill: var(--primary);
    transition: fill 0.3s;
    &:hover {
        fill: var(--font-col);
    }
`;

const ConnectionStatus = styled.span`
    display: inline-block;
    padding: 0.15rem 0.25rem;
    text-transform: uppercase;
    font-size: 0.65rem;
    border: 1px solid currentColor;
    &.offline {
        color: #e57373;
    }
    &.online {
        color: var(--primary);
    }
`;
