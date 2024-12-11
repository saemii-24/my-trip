'use client';
import useGoogleSignin from '@hooks/useGoogleSignin';
import { auth } from '@remote/firebase';

export default function Page() {
  const { signin, signout } = useGoogleSignin();
  const user = auth.currentUser;
  console.log(user);

  return (
    <div>
      메인!!
      {user ? (
        <button onClick={signout}>로그아웃</button>
      ) : (
        <button onClick={signin}>로그인</button>
      )}
    </div>
  );
}
