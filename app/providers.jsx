'use client';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { EventProvider } from './context';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <EventProvider>
        {children}
      </EventProvider>
    </Provider>
  );
} 