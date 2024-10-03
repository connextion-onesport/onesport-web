'use client';

import {RiUserLine} from 'react-icons/ri';

import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';

import AuthForm from './AuthForm';

import {useAuthStore} from '@/providers/zustand-provider';

export default function AuthDialog() {
  const {showAuth, setShowAuth} = useAuthStore(state => state);

  return (
    <Dialog open={showAuth} onOpenChange={setShowAuth}>
      <DialogTrigger className="block md:hidden" aria-label="Open Auth Dialog">
        <RiUserLine className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="flex h-dvh flex-col items-center justify-center gap-0 overflow-auto rounded-none p-0 md:h-fit md:max-w-md md:rounded-xl">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
