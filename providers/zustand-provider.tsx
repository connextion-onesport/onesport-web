'use client';

import React, {createContext, ReactNode, useContext, useRef} from 'react';
import {useStore} from 'zustand';
import {createAuthStore, type AuthStore} from '@/stores/auth-store';
import {createVenueStore, type VenueStore} from '@/stores/venue-store';
import {createPaymentStore, type PaymentStore} from '@/stores/payment-store';
import {createLocationStore, type LocationStore} from '@/stores/location-store';

type StoreApi<T extends (...args: any) => any> = ReturnType<T>;

export type StoreContextType = {
  authStore: StoreApi<typeof createAuthStore>;
  venueStore: StoreApi<typeof createVenueStore>;
  paymentStore: StoreApi<typeof createPaymentStore>;
  locationStore: StoreApi<typeof createLocationStore>;
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
      venueStore: createVenueStore(),
      paymentStore: createPaymentStore(),
      locationStore: createLocationStore(),
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

export const useVenueStore = <T,>(selector: (state: VenueStore) => T): T => {
  const {venueStore} = useStoreSelector(stores => stores);
  return useStore(venueStore, selector);
};

export const usePaymentStore = <T,>(selector: (state: PaymentStore) => T): T => {
  const {paymentStore} = useStoreSelector(stores => stores);
  return useStore(paymentStore, selector);
};

export const useLocationStore = <T,>(selector: (state: LocationStore) => T): T => {
  const {locationStore} = useStoreSelector(stores => stores);
  return useStore(locationStore, selector);
};
