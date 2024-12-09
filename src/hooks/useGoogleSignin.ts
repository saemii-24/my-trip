'use client';

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { auth } from '@remote/firebase';

function useGoogleSignin() {
  const signin = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log('user', user);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }, []);

  const signout = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, []);

  return { signin, signout };
}

export default useGoogleSignin;
