import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import ReactQueryProvider from "./components/query-client-provider.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
