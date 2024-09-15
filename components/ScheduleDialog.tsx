import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import FieldSchedule from './FieldSchedule';
import {useState} from 'react';
import {Button} from './ui/button';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

export default function ScheduleDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger aria-label="Open Schedule Dialog" className="self-start">
        <Button variant="default" className="w-fit shadow-none">
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent className="m-0 max-h-screen max-w-3xl overflow-scroll p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <FieldSchedule />
      </DialogContent>
    </Dialog>
  );
}
