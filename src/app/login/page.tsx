// import Input from "@components/public/Input";

// export default function LoginPage() {
//     return (
//         <div>
//             <h1>로그인</h1>
//             <Input type="text" />
//             <Input type="password" />
//             <button>로그인</button>
//             <p>로그인에 어려움이 있으신가요?</p>
//         </div>
//     )
// }

'use client';

import { signInWithGithub, signInWithGoogle } from '@utils/authService';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      console.log('Logged in as:', user.displayName);
      // TODO: 페이지로 redirect
    } catch (err: any) {
      alert('Google login failed: ' + err.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      const { user, token } = await signInWithGithub();
      console.log('Logged in as:', user.displayName);
      // TODO: 페이지로 redirect
    } catch (err: any) {
      alert('Google login failed: ' + err.message);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-4 border rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>로그인</h1>
      <button
        onClick={handleGoogleLogin}
        className='w-full bg-red-500 text-white p-2 rounded hover:bg-red-600'
      >
        Google 계정으로 로그인
      </button>
      <button
        onClick={handleGithubLogin}
        className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
      >
        Github 계정으로 로그인
      </button>
    </div>
  );
}
