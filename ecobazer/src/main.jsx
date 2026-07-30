import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <ThemeProvider>

        <AuthProvider>

          <CartProvider>

            <NotificationProvider>

              <App />

              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3200,
                  style: {
                    background: "#0F1712",
                    color: "#FAF9F6",
                    borderRadius: "12px",
                    fontSize: "14px",
                  },

                  success: {
                    iconTheme: {
                      primary: "#3B9260",
                      secondary: "#FAF9F6",
                    },
                  },

                  error: {
                    iconTheme: {
                      primary: "#DC2626",
                      secondary: "#FAF9F6",
                    },
                  },
                }}
              />

            </NotificationProvider>

          </CartProvider>

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);