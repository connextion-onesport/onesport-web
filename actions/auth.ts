'use server';

import {auth, signIn, signOut} from '@/auth';

export async function googleAuth() {
  await signIn('google');
}

export async function getUser() {
  const session = await auth();

  if (!session?.user) return null;

  return session.user;
}

export async function handleSignOut() {
  await signOut();
}
