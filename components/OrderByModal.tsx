import {orderByModal} from '@/libs/constants';
import {useState} from 'react';

export default function OrderByModal() {
  return (
    <div className="p-5">
      <p className="text-lg font-semibold">Order by</p>
      <div className="grid grid-cols-2 pt-3 lg:gap-x-7 lg:gap-y-1">
        {orderByModal.map(order => (
          <div className="flex" key={order.id}>
            <label htmlFor={order.htmlFor} className="relative flex gap-3 text-base">
              <input
                type="radio"
                name="orderBy"
                id={order.id}
                key={order.id}
                value={order.value}
                className="peer my-auto h-4 w-4 self-center border-gray-300"
                // onChange={() => setIsChecked(!isChecked)}
              />
              {order.text}
            </label>
            {/* Check icon */}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
