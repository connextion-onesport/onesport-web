import {orderByModal} from '@/libs/constants';
import {useState} from 'react';

export default function OrderByContent({
  selectedOrder,
  setSelectedOrder,
}: {
  selectedOrder: string | null;
  setSelectedOrder: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(event.target.value);
  };

  return (
    <div className="min-w-[30rem] space-y-3 p-5 pt-3">
      <h2 className="text-lg font-semibold">Order</h2>
      <div className="grid grid-cols-2 gap-3 text-base">
        {orderByModal.map(({id, htmlFor, value, text}) => (
          <label htmlFor={htmlFor} key={id} className="relative flex gap-3">
            <input
              type="radio"
              name="orderBy"
              id={id}
              value={value}
              className="peer my-auto h-4 w-4 self-center border-gray-300"
              onChange={handleChange}
              checked={value === selectedOrder}
            />
            {text}
          </label>
        ))}
      </div>
    </div>
  );
}
