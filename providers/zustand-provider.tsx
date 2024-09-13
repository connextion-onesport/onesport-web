'use client';

import React, {createContext, ReactNode, useContext, useRef} from 'react';
import {useStore} from 'zustand';
import {createAuthStore, type AuthStore} from '@/stores/auth-store';

type StoreApi<T extends (...args: any) => any> = ReturnType<T>;

export type StoreContextType = {
  authStore: StoreApi<typeof createAuthStore>;
};

const defaultContext = {} as StoreContextType;

const StoreContext = createContext<StoreContextType>(defaultContext);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({children}: StoreProviderProps) => {
  const storeRef = useRef<StoreContextType | null>(null);

  if (!storeRef.current) {
    storeRef.current = {
      authStore: createAuthStore(),
    };
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStoreSelector = <T,>(selector: (stores: StoreContextType) => T): T => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreSelector must be used within StoreProvider');
  }

  return selector(context);
};

export const useAuthStore = <T,>(selector: (state: AuthStore) => T): T => {
  const {authStore} = useStoreSelector(stores => stores);
  return useStore(authStore, selector);
};
