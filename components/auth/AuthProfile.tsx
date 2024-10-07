'use client';

import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Separator} from '@/components/ui/separator';

import {handleSignOut} from '@/actions/auth';
import {getInitials} from '@/libs/utils';

import Link from 'next/link';
import {User} from 'next-auth';

import {ChevronDownIcon} from '@radix-ui/react-icons';
import {PiCourtBasketball} from 'react-icons/pi';
import {RiLogoutBoxLine, RiUser3Line} from 'react-icons/ri';

export default function AuthProfile({user}: {user: User}) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const {mutateAsync: signOutUserMutation} = useMutation({
    mutationFn: handleSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
    },
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center justify-center" aria-label="Open User Profile">
        <Avatar className="h-9 w-9 rounded-full md:rounded-md">
          <AvatarImage src={user?.image!} width={36} height={36} alt={user?.name!} />
          <AvatarFallback className="h-9 w-9 rounded-md bg-primary text-primary-foreground">
            {getInitials(user?.name!)}
          </AvatarFallback>
        </Avatar>
        {isOpen ? (
          <ChevronDownIcon className="ml-0.5 hidden h-4 w-4 rotate-180 transition-transform duration-200 md:flex" />
        ) : (
          <ChevronDownIcon className="ml-0.5 hidden h-4 w-4 md:flex" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-9 w-9 rounded-md">
            <AvatarImage src={user?.image!} width={36} height={36} alt={user?.name!} />
            <AvatarFallback className="h-9 w-9 rounded-md bg-primary text-primary-foreground">
              {getInitials(user?.name!)}
            </AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p className="truncate text-sm font-semibold">{user?.name!}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email!}</p>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col">
          <Button
            variant="ghost"
            asChild
            className="flex min-h-12 w-full justify-start rounded-sm pl-0"
          >
            <Link href="#">
              <RiUser3Line className="mr-2 h-5 w-5" />
              Profil
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="flex min-h-12 w-full justify-start rounded-sm pl-0"
          >
            <Link href="#">
              <PiCourtBasketball className="mr-2 h-5 w-5" />
              Lapangan Saya
            </Link>
          </Button>
        </div>

        <Separator />

        <Button
          variant="ghost"
          className="flex min-h-12 w-full justify-start rounded-sm pl-0"
          onClick={() => signOutUserMutation()}
        >
          <RiLogoutBoxLine className="mr-2 h-5 w-5" />
          Keluar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
