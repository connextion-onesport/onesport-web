'use client';

import {useAuthStore} from '@/providers/zustand-provider';
import {DialogDescription, DialogHeader, DialogTitle} from '../ui/dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

export default function AuthHeader() {
  const {currentStep} = useAuthStore(state => state);

  return (
    <DialogHeader className="w-full border-b-2 p-6">
      <DialogTitle>
        {currentStep === 'register' && 'Buat Akun'}
        {currentStep === 'login' && 'Masuk'}
      </DialogTitle>
      <VisuallyHidden>
        <DialogDescription>
          {currentStep === 'register' && 'Buat akun baru untuk memulai.'}
          {currentStep === 'login' && 'Masuk ke akun Anda untuk melanjutkan.'}
        </DialogDescription>
      </VisuallyHidden>
    </DialogHeader>
  );
}
