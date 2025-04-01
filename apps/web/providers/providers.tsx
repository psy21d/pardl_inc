/* 
  psy21d 
  Apche 2.0 licensed
*/
"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import { ReduxProvider } from "@/store/provider";
import { AuthProvider } from "./AuthProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "./SubscriptionProvider";
import { BreakpointsProvider } from "./breakpoints-provider";
declare global {
  interface Window {
    analytics?: any;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.page();
    }
  }, [pathname]);

  return (
    <ReduxProvider>
      <LanguageProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <BreakpointsProvider>
            <AuthProvider>
              <SubscriptionProvider>{children}</SubscriptionProvider>
            </AuthProvider>
          </BreakpointsProvider>
        </NextThemesProvider>
      </LanguageProvider>
    </ReduxProvider>
  );
}
