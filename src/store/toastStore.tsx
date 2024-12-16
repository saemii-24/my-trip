import { create } from 'zustand';
import cryptoRandomString from 'crypto-random-string';

// Toast 데이터 타입 정의
interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning'; // Toast 타입
  message: string;
}

// 상태 타입 정의
interface ToastState {
  toasts: Toast[];
  addToast: (type: 'success' | 'info' | 'error' | 'warning', message: string) => void;
  deleteToast: (id: string) => void; // 특정 id의 Toast 제거
}

const toastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = cryptoRandomString({ length: 14, type: 'base64' });
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }],
    }));
  },
  deleteToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default toastStore;
