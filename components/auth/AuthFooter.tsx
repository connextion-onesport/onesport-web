'use client';

import {useAuthStore} from '@/providers/zustand-provider';

export default function AuthFooter() {
  const {currentStep, setCurrentStep} = useAuthStore(state => state);

  function toggleCurrentStep() {
    if (currentStep === 'login') {
      setCurrentStep('register');
    } else if (currentStep === 'register') {
      setCurrentStep('login');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <span className="text-sm text-muted-foreground">
        {currentStep === 'register' && 'Sudah memiliki akun?'}
        {currentStep === 'login' && 'Belum memiliki akun?'}
      </span>
      <span
        onClick={toggleCurrentStep}
        className="cursor-pointer text-sm text-primary hover:underline"
      >
        {currentStep === 'register' && 'Masuk'}
        {currentStep === 'login' && 'Daftar'}
      </span>
    </div>
  );
}
