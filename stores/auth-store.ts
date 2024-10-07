import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';

export type AuthState = {
  showAuth: boolean;
  currentStep: string;
  inProgress: boolean;
};

export type AuthActions = {
  setShowAuth: (showAuth: boolean) => void;
  setCurrentStep: (currentStep: string) => void;
  setInProgress: (inProgress: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  showAuth: false,
  currentStep: 'login',
  inProgress: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return create<AuthStore>()(
    persist(
      set => ({
        ...initState,
        setShowAuth: showAuth => set(() => ({showAuth})),
        setCurrentStep: currentStep => set(() => ({currentStep})),
        setInProgress: inProgress => set(() => ({inProgress})),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      } as PersistOptions<AuthStore>
    )
  );
};
