'use client';

import {Dialog, DialogContent} from '@/components/ui/dialog';

import AuthForm from './AuthForm';

import {useAuthStore} from '@/providers/zustand-provider';

export default function AuthDialog() {
  const {showAuth, setShowAuth} = useAuthStore(state => state);

  return (
    <Dialog open={showAuth} onOpenChange={setShowAuth}>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 overflow-auto rounded-none p-0 md:h-fit md:max-w-md md:rounded-xl">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
