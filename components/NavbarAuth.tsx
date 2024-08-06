'use client';

import {Button} from './ui/button';
import AuthDialog from './AuthDialog';
import {useState} from 'react';

export default function NavbarAuth() {
  const [authVariant, setAuthVariant] = useState<string>('login');
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);

  function handleRegister() {
    setAuthVariant('email');
    setShowAuthDialog(true);
  }

  function handleLogin() {
    setAuthVariant('login');
    setShowAuthDialog(true);
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      {showAuthDialog && (
        <AuthDialog
          authVariant={authVariant}
          showAuth={showAuthDialog}
          setShowAuth={setShowAuthDialog}
        />
      )}

      <Button variant="outline" size="lg" className="px-4" onClick={handleLogin}>
        Login
      </Button>
      <Button size="lg" className="px-4" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
}
