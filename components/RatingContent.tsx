import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';

export default function RatingContent({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: number | null;
  setSelectedRating: (value: number | null) => void;
}) {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    // Update activeButton when selectedRating changes
    if (selectedRating === 4.0) {
      setActiveButton(1);
    } else if (selectedRating === 4.5) {
      setActiveButton(2);
    } else {
      setActiveButton(null);
    }
  }, [selectedRating]);

  const handleClick = (buttonNumber: number, rating: number) => {
    if (activeButton === buttonNumber) {
      // Deactivate if clicked again
      setActiveButton(null);
      setSelectedRating(null);
    } else {
      setActiveButton(buttonNumber);
      setSelectedRating(rating);
    }
  };

  return (
    <div className="p-5">
      <p className="text-lg font-semibold">Rating</p>
      <div className="grid grid-cols-2 pb-4 pt-3">
        <Button
          variant={activeButton === 1 ? 'default' : 'outline'}
          className={`rounded-l-full border-r-white font-normal ${
            activeButton === 1 ? 'text-white' : 'text-muted-foreground'
          }`}
          onClick={() => handleClick(1, 4.0)}
        >
          4.0 +
        </Button>
        <Button
          variant={activeButton === 2 ? 'default' : 'outline'}
          className={`rounded-r-full font-normal ${
            activeButton === 2 ? 'text-white' : 'text-muted-foreground'
          }`}
          onClick={() => handleClick(2, 4.5)}
        >
          4.5 +
        </Button>
      </div>
    </div>
  );
}
