import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import db from './firestore';

export const saveUserToFirestore = async ({
  uid,
  email,
  displayName,
  phoneNumber,
  photoURL,
  providerId,
}: {
  uid: string;
  email: string | null;
  displayName: string;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
}) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(
    userRef,
    {
      uid,
      email,
      displayName,
      phoneNumber,
      photoURL,
      providerId,
      country: null,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const getUserCountry = async (uid: string): Promise<string | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data()?.country || null;
  } else {
    return null;
  }
};
