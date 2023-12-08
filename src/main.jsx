import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import App from './App';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraBaseProvider } from '@chakra-ui/react'
const GoogleClientId = import.meta.env.VITE_GAUTHKEY;
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={GoogleClientId}>
  <React.StrictMode>
    <Provider store={Store} >
      <PersistGate loading={null} persistor={persistor} >
        <ChakraBaseProvider>
        <QueryClientProvider client={queryClient} >
      <App />
      </QueryClientProvider>
        </ChakraBaseProvider>
      </PersistGate>

    </Provider>
   
  </React.StrictMode>
  </GoogleOAuthProvider>
);


