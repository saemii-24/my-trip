import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import firebaseApp from './firebase';
import { saveUserToFirestore } from './authCRUD';

const auth = getAuth(firebaseApp);

// 이메일 회원가입입
export const registerWithEmail = async (email: string, password: string) => {
  // Firebase Auth에 사용자 생성
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  // USER 컬렉션에 사용자 정보 저장
  await saveUserToFirestore({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || '',
    phoneNumber: null,
    photoURL: null,
    providerId: '',
  });

  return user;
};
// 로그인
export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// 로그아웃
export const logout = () => signOut(auth);

// 사용자 상태 변화 감지
export const observeUser = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};

//구글 로그인
const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.setCustomParameters({
  prompt: 'select_account', //사용자가 로그인 시 구글 계정 선택할 수 있도록 함
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    console.log('Google login success:', user);
    return { user, token };
  } catch (error: any) {
    console.error('Google Sign-in error', error);
    throw error;
  }
};

//깃허브 로그인

const githubProvider = new GithubAuthProvider();

// githubProvider.addScope('repo');

githubProvider.setCustomParameters({
  allow_signup: 'false',
});

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const user = result.user;

    console.log('GitHub login success:', user);
    return { user, token };
  } catch (error: any) {
    console.error('GitHub login failed:', error);
    throw error;
  }
};
