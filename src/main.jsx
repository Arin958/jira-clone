// main.jsx or index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { AuthProvider } from "./contexts/AuthContext.jsx"; // Import AuthProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </PersistGate>
          </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </StrictMode>,
);