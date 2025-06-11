"use client";
import { Lexend } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Header from "@/components/organisms/Header";
import { ToastProvider } from "@/hooks/useToast";
import Footer from "@/components/molecules/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";
import "../utils/prototype";
import { SessionProvider } from "next-auth/react";
// In app directory
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const inter = Lexend({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastProvider>
              <ThemeProvider theme={theme}>
                <AppRouterCacheProvider>
                  <CssBaseline />

                  <Header />
                  <ProgressBar
                    height="4px"
                    color="black"
                    shallowRouting
                    options={{ showSpinner: false }}
                  />
                  <div className="min-h-[70vh] bg-white">{children}</div>
                  <Footer />
                </AppRouterCacheProvider>
              </ThemeProvider>
            </ToastProvider>
          </PersistGate>
          </Provider>
          </SessionProvider>
      </body>
    </html>
  );
}
