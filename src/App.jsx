import '@/App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'pages/Main.jsx';
import Tooltip from 'shared/ui/Tooltip/Tooltip.jsx';
import { eventEmitter } from 'shared/helpers/eventEmitter.js';
import { useState } from 'react';
import styled from 'styled-components';

const SystemTooltip = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    color: red;
    z-index: 3;
`;
function App() {
    const [systemError, setSystemError] = useState('');

    eventEmitter.on('api:Error', (e) => {
        setSystemError(e.message);
    });

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
            {!!systemError && (
                <SystemTooltip>
                    <Tooltip setShow={setSystemError}>Server Error: {systemError}</Tooltip>
                </SystemTooltip>
            )}
        </div>
    );
}

export default App;
