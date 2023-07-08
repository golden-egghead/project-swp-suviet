import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MaterialUIControllerProvider as AdminProvider } from './admin/context';
import { MaterialUIControllerProvider as ModeratorProvider } from './components/moderator2/context';

// import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider
    clientId="205655752677-6vj8bfak2ls2rpqf5lhoakcrm238vcu7.apps.googleusercontent.com">

    
<BrowserRouter>
    <AdminProvider>
      <ModeratorProvider>
        <React.StrictMode>
          {/* <StyledEngineProvider injectFirst> */}
          <App />
          {/* </StyledEngineProvider> */}
        </React.StrictMode>
      </ModeratorProvider>
    </AdminProvider>
  </BrowserRouter>
   
  </GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
