'use server';

import {auth, signIn, signOut} from '@/auth';
import {prisma} from '@/libs/prisma';

export async function googleAuth() {
  await signIn('google');
}

export async function getUserSession() {
  const session = await auth();

  if (!session?.user) return null;

  return session.user;
}

export async function getUserId() {
  const user = await getUserSession();

  if (!user) return null;

  return user.id;
}

export async function getUser() {
  const id = await getUserId();

  if (!id) return null;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function handleSignOut() {
  await signOut();
}
