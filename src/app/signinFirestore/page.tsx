'use client';

import db from '@utils/firestore';
import { collection, addDoc } from 'firebase/firestore';

export default function SigninFireStore() {
  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return <button onClick={handleSave}>Firestore에 저장</button>;
}
