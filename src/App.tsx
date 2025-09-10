import React from 'react';
import Timeline from './components/Timeline/Timeline';
import './styles/index.scss';
import { testTopics } from './test-data';

function App() {
    return (
        <main className="app">
            <Timeline
                title={<>Исторические<br/>даты</>}
                topics={testTopics}
            />
        </main>
    );
}

export default App;
