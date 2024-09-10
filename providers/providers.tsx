'use client';

import { StoreProvider as ZustandProvider } from './zustand-provider';
import {ReactQueryClientProvider as ReactQueryProvider} from './react-query-provider';
import {ThemeProvider} from './theme-provider';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ZustandProvider>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </ZustandProvider>
  );
}
