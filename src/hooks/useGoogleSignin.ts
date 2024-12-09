import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { auth } from '@remote/firebase';

function useGoogleSignin() {
  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      console.log('user', user);
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }, []);

  const signout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, []);

  // 반환값 추가
  return { signin, signout };
}

export default useGoogleSignin;
