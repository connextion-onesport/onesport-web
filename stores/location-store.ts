import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';

export type LocationState = {
  latitude: number;
  longitude: number;
};

export type LocationActions = {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
};

export type LocationStore = LocationState & LocationActions;

export const defaultInitState: LocationState = {
  latitude: 0,
  longitude: 0,
};

export const createLocationStore = (initState: LocationState = defaultInitState) => {
  return create<LocationStore>()(
    persist(
      set => ({
        ...initState,
        setLatitude: latitude => set(() => ({latitude})),
        setLongitude: longitude => set(() => ({longitude})),
      }),
      {
        name: 'location-storage',
        storage: createJSONStorage(() => localStorage),
      } as PersistOptions<LocationStore>
    )
  );
};
