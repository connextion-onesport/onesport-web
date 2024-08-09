'use client';

import {Dispatch, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {EnterIcon} from '@radix-ui/react-icons';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import AuthForm from './AuthForm';
import {RiUserLine} from 'react-icons/ri';

export default function AuthDialog({
  authVariant,
  showAuth,
  setShowAuth,
}: {
  authVariant: string;
  showAuth?: boolean;
  setShowAuth?: Dispatch<boolean>;
}) {
  const [isOpen, setIsOpen] = useState(false || showAuth);

  if (!isOpen && setShowAuth) setShowAuth(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={`${showAuth ? 'hidden' : 'flex'} h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground`}
        aria-label="Open Auth Dialog"
      >
        <RiUserLine className="h-6 w-6 sm:h-5 sm:w-5" />
      </DialogTrigger>
      <DialogContent className="flex h-dvh w-full items-center justify-center overflow-auto p-0 sm:h-fit sm:w-fit">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Authentication</DialogTitle>
            <DialogDescription>
              If you already have an account, please login. If you don&apos;t have an account,
              please register.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <AuthForm openAuth={setIsOpen} authVariant={authVariant} />
      </DialogContent>
    </Dialog>
  );
}
