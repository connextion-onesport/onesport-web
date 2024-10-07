import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';

export type PaymentState = {
  venueId: string;
  selectedStatus: string;
};

export type PaymentActions = {
  setVenueId: (venueId: string) => void;
  setSelectedStatus: (status: string) => void;
};

export type PaymentStore = PaymentState & PaymentActions;

export const defaultInitState: PaymentState = {
  venueId: '',
  selectedStatus: 'ALL',
};

export const createPaymentStore = (initState: PaymentState = defaultInitState) => {
  return create<PaymentStore>()(
    persist(
      set => ({
        ...initState,
        setVenueId: (venueId: string) => set(() => ({venueId})),
        setSelectedStatus: (selectedStatus: string) => set(() => ({selectedStatus})),
      }),
      {
        name: 'payment-storage',
        storage: createJSONStorage(() => sessionStorage),
      } as PersistOptions<PaymentStore>
    )
  );
};
