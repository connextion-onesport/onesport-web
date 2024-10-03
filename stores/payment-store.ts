import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';

export type PaymentState = {
  venueId: string;
};

export type PaymentActions = {
  setVenueId: (venueId: string) => void;
  
};

export type PaymentStore = PaymentState & PaymentActions;

export const defaultInitState: PaymentState = {
  venueId: '',
};

export const createPaymentStore = (initState: PaymentState = defaultInitState) => {
  return create<PaymentStore>()(
    persist(
      set => ({
        ...initState,
        setVenueId: (venueId: string) => set(() => ({venueId})),
      }),
      {
        name: 'payment-session-storage',
        storage: createJSONStorage(() => sessionStorage),
      } as PersistOptions<PaymentStore>
    )
  );
};
