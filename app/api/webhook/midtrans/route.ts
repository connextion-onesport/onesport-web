const midtransClient = require('midtrans-client');
import {prisma} from '@/libs/prisma';
import {NextResponse} from 'next/server';
import crypto from 'crypto';
import {formatISO, parse} from 'date-fns';

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

async function updatePaymentStatus(
  orderId: string,
  amount: number,
  currency: string,
  date: string,
  type: string,
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED',
  expiryTime: string
) {
  try {
    await prisma.payment.update({
      where: {
        orderId,
      },
      data: {
        amount,
        currency,
        date,
        type,
        status,
        expiryTime,
      },
    });

    const payment = await prisma.payment.findUnique({
      where: {
        orderId,
      },
      include: {
        bookings: true,
      }
    });

    if (!payment) {
      return NextResponse.json({
        message: 'Payment not found',
        status: 404,
      });
    }

    if (status === 'PENDING' && payment) {
      for (const booking of payment.bookings) {
        await prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: 'PENDING',
          },
        });
      }
    }

    if (status === 'SUCCESS' && payment) {
      for (const booking of payment.bookings) {
        await prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: 'CONFIRMED',
          },
        });
      }
    }

    if ((status === 'FAILED' || status === 'REFUNDED') && payment) {
      for (const booking of payment.bookings) {
        await prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: 'CANCELLED',
          },
        });
      }
    }

    return NextResponse.json({
      message: 'Success',
      status: 200,
    });
  } catch (error) {
    console.error('Failed to update payment status:', error);
    return NextResponse.json({
      message: 'Failed to update payment status',
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const transaction = await apiClient.transaction.notification(body);

  const {
    currency,
    fraud_status,
    gross_amount,
    order_id,
    status_code,
    payment_type,
    signature_key,
    expiry_time,
    transaction_status,
    transaction_time,
  } = transaction;

  const serverKey = process.env.MIDTRANS_SERVER_KEY as string;

  const expectedSignatureKey = crypto
    .createHash('sha512')
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest('hex');

  if (expectedSignatureKey !== signature_key) {
    return NextResponse.json({
      message: 'Invalid signature key',
      status: 400,
    });
  }

  const payment = await prisma.payment.findUnique({
    where: {
      orderId: order_id,
    },
  });

  if (!payment) {
    return NextResponse.json({
      message: 'Payment not found',
      status: 404,
    });
  }

  const transactionDate = parse(transaction_time, 'yyyy-MM-dd HH:mm:ss', new Date());
  const expiryDate = parse(expiry_time, 'yyyy-MM-dd HH:mm:ss', new Date());

  const transactionDateISO = formatISO(transactionDate);
  const expiryDateISO = formatISO(expiryDate);

  const grossAmount = parseFloat(gross_amount);

  switch (transaction_status) {
    case 'capture':
      if (fraud_status === 'challenge') {
        return updatePaymentStatus(
          order_id,
          grossAmount,
          currency,
          transactionDateISO,
          payment_type,
          'PENDING',
          expiryDateISO
        );
      } else if (fraud_status === 'accept') {
        return updatePaymentStatus(
          order_id,
          grossAmount,
          currency,
          transactionDateISO,
          payment_type,
          'SUCCESS',
          expiryDateISO
        );
      }
      break;

    case 'settlement':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'SUCCESS',
        expiryDateISO
      );

    case 'deny':
    case 'cancel':
    case 'expire':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'FAILED',
        expiryDateISO
      );

    case 'pending':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'PENDING',
        expiryDateISO
      );

    case 'refund':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'REFUNDED',
        expiryDateISO
      );

    case 'partial_refund':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'REFUNDED',
        expiryDateISO
      );

    case 'chargeback':
    case 'partial_chargeback':
      return updatePaymentStatus(
        order_id,
        grossAmount,
        currency,
        transactionDateISO,
        payment_type,
        'FAILED',
        expiryDateISO
      );

    default:
      return NextResponse.json({
        message: 'Transaction status not recognized',
        status: 404,
      });
  }
}
