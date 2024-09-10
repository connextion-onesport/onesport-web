import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';

export type AuthState = {
  email: string;
  showAuth: boolean;
  currentStep: string;
  inProgress: boolean;
};

export type AuthActions = {
  setEmail: (email: string) => void;
  setShowAuth: (showAuth: boolean) => void;
  setCurrentStep: (currentStep: string) => void;
  setInProgress: (inProgress: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  email: 'admin@onesport.com',
  showAuth: false,
  currentStep: 'login',
  inProgress: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return create<AuthStore>()(
    persist(
      set => ({
        ...initState,
        setEmail: email => set(() => ({email})),
        setShowAuth: showAuth => set(() => ({showAuth})),
        setCurrentStep: currentStep => set(() => ({currentStep})),
        setInProgress: inProgress => set(() => ({inProgress})),
      }),
      {
        name: 'auth-session-storage',
        storage: createJSONStorage(() => sessionStorage),
      } as PersistOptions<AuthStore>
    )
  );
};
