import { useRef, useState } from 'react';
import styled from 'styled-components';
import { enterBotton, exitBotton } from '../global/keyframes';
import Button from './Button';

const Toast = ({ toastOk, children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const toastParent = useRef();

    const handleOk = () => {
        toastOk();
        removeToast();
    };

    const removeToast = () => {
        const toastEl = toastParent.current;
        toastEl.classList.add('slide-down');
        // when animation finishes, remove the toast
        toastEl.addEventListener('animationend', () => {
            setIsVisible(false);
        });
    };

    return isVisible ? (
        <StyledToast className="slide-up" ref={toastParent}>
            <Text>{children}</Text>
            <StyledButton handleClick={handleOk}>Ok</StyledButton>
            <StyledButton handleClick={removeToast}>No</StyledButton>
        </StyledToast>
    ) : null;
};

export default Toast;

/******************************************************
    STYLES
******************************************************/

const StyledToast = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    transform: translateY(120%);
    display: flex;
    width: 350px;
    font-size: 0.875rem;
    background-color: rgb(var(--black));
    transition: transform 0.3s;
    animation: ${enterBotton} 0.3s ease-in-out forwards;
    &.slide-down {
        animation: ${exitBotton} 0.3s ease-in-out forwards;
    }
`;

const Text = styled.div`
    flex-grow: 1;
    padding: 0.5rem 1rem;
`;

const StyledButton = styled(Button)`
    border: 0;
`;
