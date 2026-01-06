// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. Import Router
import { AuthProvider } from "./context/AuthContext.jsx"; // 2. Import Auth
import App from "./App.jsx";
import "./index.css"; // Your new Tailwind styles
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 👈 IMPORT THIS


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 3. Router MUST be the OUTER wrapper */}
    <BrowserRouter>
      {/* 4. AuthProvider is INSIDE the Router */}
      <AuthProvider>
        <HelmetProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* 👈 WRAP WITH THIS */}
      
        <App />
        </GoogleOAuthProvider>
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);