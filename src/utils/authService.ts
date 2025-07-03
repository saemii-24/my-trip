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
import { saveUserToFirestore, getUserCountry } from './authCRUD';
import { doc, getDoc } from 'firebase/firestore';
import db from './firestore';

const auth = getAuth(firebaseApp);

// ✅ 회원가입
export const registerWithEmail = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

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

// ✅ 이메일 로그인
export const signInWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(getAuth(), email, password);
  const user = result.user;

  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);
  console.log(userDocSnap);
  const country = userDocSnap.exists() ? userDocSnap.data()?.country : null;

  return { user, country };
};

// ✅ 로그아웃
export const logout = () => signOut(auth);

// ✅ 사용자 상태 변화 감지
export const observeUser = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};

// ✅ Google 로그인
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    // Firestore에 사용자 정보 저장
    await saveUserToFirestore({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      phoneNumber: user.phoneNumber || null,
      photoURL: user.photoURL || null,
      providerId: user.providerData[0]?.providerId || '',
    });

    const country = await getUserCountry(user.uid);

    return { user, token, country };
  } catch (error: any) {
    console.error('Google Sign-in error', error);
    throw error;
  }
};

// ✅ GitHub 로그인
const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({ allow_signup: 'false' });

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    // Firestore에 사용자 정보 저장
    await saveUserToFirestore({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      phoneNumber: user.phoneNumber || null,
      photoURL: user.photoURL || null,
      providerId: user.providerData[0]?.providerId || '',
    });

    const country = await getUserCountry(user.uid);

    return { user, token, country };
  } catch (error: any) {
    console.error('GitHub login failed:', error);
    throw error;
  }
};
