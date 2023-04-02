import { signOut } from 'next-auth/react';
import { useCallback } from 'react';

const redirectHomePathnames = ['/settings'];

export default function useSignOut() {
  return useCallback(() => {
    const redirectUri = redirectHomePathnames.includes(window.location.pathname)
      ? window.location.origin
      : window.location.href;

    signOut({ callbackUrl: `/signout-provider?redirect_uri=${redirectUri}` });
  }, []);
}