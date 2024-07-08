import type { ChildrenProps } from "@/interfaces";
import "aos/dist/aos.css";
import "@/styles/globals.css";
import TopLoader from "nextjs-toploader";
import AppThemeProvider from "@/theme/Theme";
import AppSessionProvider from "@/sessions/Session";
import { Suspense } from "react";
import InitPage from "@/components/InitPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StoreProvider from "@/store/provider";

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="id-ID" suppressHydrationWarning suppressContentEditableWarning>
      <head>
        <title>Frontend Repo</title>
      </head>
      <body>
        <TopLoader
          color="#05b6d3"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
        />
        <Suspense>
          <AppRouterCacheProvider>
            <AppSessionProvider>
              <AppThemeProvider>
                <InitPage>
                  <StoreProvider>{children}</StoreProvider>
                </InitPage>
              </AppThemeProvider>
            </AppSessionProvider>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
