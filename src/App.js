import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Help from './components/Help';

function App() {
    const sendDesktopNotification = () => {
        const title = 'Notifications Title';
        const body = 'The desktop notification body goes here';
        new Notification(title, { body });
    };

    return (
        <StyledApp>
            <Header />
            <Main>
                {/* You can remove me */}
                <p style={{ padding: '0 1rem 1rem' }}>
                    Use the keyboard shortcut <code>ctrl/cmd + H</code> if you
                    need help.
                </p>

                <Help />
                <Toast toastOk={sendDesktopNotification}>
                    Do you want to send a Desktop notification?
                </Toast>
            </Main>
            <Footer />
        </StyledApp>
    );
}

export default App;

/******************************************************
    STYLES
******************************************************/

const StyledApp = styled.div`
    background-color: var(--bg-col);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
`;

const Main = styled.main`
    flex-grow: 1;
`;
