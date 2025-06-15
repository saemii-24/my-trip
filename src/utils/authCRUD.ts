import { UserInfo } from 'firebase/auth';
import { doc, serverTimestamp, setDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from './firebase';

const db = getFirestore(firebaseApp);

//  사용자 정보 저장
export const saveUserToFirestore = async (user: UserInfo) => {
  const userRef = doc(db, 'USER', user.uid);

  await setDoc(
    userRef,
    {
      email: user.email,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};
