'use client';

import Script from 'next/script';
import {CredentialResponse} from 'google-one-tap';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {auth, signIn} from '@/auth';

const GoogleOneTap = () => {
  const router = useRouter();

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    const initializeGoogleOneTap = () => {
      console.log('Initializing Google One Tap');
      window.addEventListener('load', async () => {
        const [nonce, hashedNonce] = await generateNonce();
        console.log('Nonce: ', nonce, hashedNonce);

        // check if there's already an existing session before initializing the one-tap UI
        const session = await auth();

        if (!session) {
          console.log('No existing session found');
        }
        if (session) {
          router.push('/');
          return;
        }

        /* global google */
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          callback: async (response: CredentialResponse) => {
            try {
              // send id token returned in response.credential to next auth
              const result = await signIn('google', {
                redirect: false,
              });

              if (!result) throw new Error('Failed to sign in with Google One Tap');
              console.log('Session data: ', result);
              console.log('Successfully logged in with Google One Tap');

              // redirect to protected page
              router.push('/');
            } catch (error) {
              console.error('Error logging in with Google One Tap', error);
            }
          },
          nonce: hashedNonce,
          // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
          use_fedcm_for_prompt: true,
        });
        google.accounts.id.prompt(); // Display the One Tap UI
      });
    };
    initializeGoogleOneTap();
    return () => window.removeEventListener('load', initializeGoogleOneTap);
  }, [router]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <div id="oneTap" className="fixed right-0 top-0 z-[100]" />
    </>
  );
};

export default GoogleOneTap;
