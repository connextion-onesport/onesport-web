'use client';

import {useState} from 'react';
import {ArrowRightIcon} from '@radix-ui/react-icons';
import {Button} from '../ui/button';
import {FcGoogle} from 'react-icons/fc';
import {useAuthStore} from '@/providers/zustand-provider';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {googleAuth} from '@/actions/auth';

export default function AuthSocial() {
  const {currentStep, setShowAuth} = useAuthStore(state => state);
  const [googleHover, setGoogleHover] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {mutateAsync: googleAuthMutation} = useMutation({
    mutationFn: googleAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
    },
  });

  const handleGoogleAuth = async () => {
    await googleAuthMutation();
    setShowAuth(false);
  };

  return (
    <Button
      variant="outline"
      className="flex h-12 p-5"
      onClick={async () => await handleGoogleAuth()}
      onMouseOver={() => setGoogleHover(true)}
      onMouseLeave={() => setGoogleHover(false)}
    >
      <span className="flex aspect-square h-5 w-5 items-center justify-center">
        <FcGoogle className="h-full w-full" />
      </span>
      <span className="ml-4 flex w-full items-center justify-between">
        <span className="w-fit text-sm">
          {currentStep === 'login' ? 'Masuk' : 'Daftar'} menggunakan Google
        </span>
        {googleHover && <ArrowRightIcon className="h-4 w-4" />}
      </span>
    </Button>
  );
}
