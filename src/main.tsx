import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/pages/Farm/ErrorBoundary.js';


const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
         {/* <ErrorBoundary> */}
            <App />
        {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
} else {
  console.error('Root element with id "root" not found in the document.');
}



