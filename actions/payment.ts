'use server';

const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const randomNumber = Math.floor(Math.random() * 1000000) + 1;

let paymentParameter = {
  transaction_details: {
    order_id: `test-booking-${randomNumber}`,
    gross_amount: 200000,
  },
  item_details: [],
};

export const createPaymentToken = async () => {
  try {
    const token = await snap.createTransactionToken(paymentParameter);

    return token;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction. Please try again later.');
  }
};
