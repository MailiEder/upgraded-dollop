/*
// so in Video 1
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// so in Video 3:

import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from "./context/Context";

// das geht:
/*
ReactDOM.render(
<React.StrictMode>
    <App />  
</React.StrictMode>,
document.getElementById('root')
);
*/


// das geht nicht:
/*
ReactDOM.render(
<React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider> 
</React.StrictMode>,
document.getElementById('root')
);
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <App />
  </ContextProvider> 
  </React.StrictMode>
);
