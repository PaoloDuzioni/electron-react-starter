const { keyframes } = require('styled-components');

// Transition from the bottom up

// Enter
export const enterBotton = keyframes`
    from {
        transform: translateY(120%);
    }
    to {
        transform: translateY(0%);
    }
`;
// Exit
export const exitBotton = keyframes`
    from {
        transform: translateY(0%);
    }
    to {
        transform: translateY(120%);
    }
`;
