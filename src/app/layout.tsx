'use client';

import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '@/redux/store';

export default function RootLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MantineProvider>
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}