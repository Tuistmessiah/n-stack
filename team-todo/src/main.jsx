import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import 'primereact/resources/themes/lara-light-blue/theme.css'; // theme (choose one)
import 'primereact/resources/primereact.min.css'; // core styles
import 'primeicons/primeicons.css'; // icons

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
