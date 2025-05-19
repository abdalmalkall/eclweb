import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import './styles.css';
import App from './App.jsx'
import { NotificationProvider } from '@/contexts/NotificationContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>

      <App />
    </NotificationProvider>

  </StrictMode>,
)
serviceWorkerRegistration.register();
