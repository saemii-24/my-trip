import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseApp from './firebase';

const auth = getAuth(firebaseApp);

// 회원가입
export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

// 로그인
export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// 로그아웃
export const logout = () => signOut(auth);

// 사용자 상태 변화 감지
export const observeUser = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};
