'use client';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {getInitials} from '@/libs/utils';
import {Separator} from '@/components/ui/separator';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {handleSignOut} from '@/actions/auth';
import {User} from 'next-auth';

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

        <Button className="w-full" onClick={() => signOutUserMutation()}>
          Keluar
        </Button>
      </PopoverContent>
    </Popover>
  );
}
