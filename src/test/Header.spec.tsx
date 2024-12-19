import { render, screen } from '@testing-library/react';
import Header from '@components/Header';

jest.mock('@remote/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn((callback) => {
      callback(null); // 테스트용으로 null 사용자 상태
      return jest.fn(); // unsubscribe 함수 반환
    }),
  },
}));
// useGoogleSignin 훅을 mock
jest.mock('@hooks/useGoogleSignin', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signin: jest.fn(),
    signout: jest.fn(),
  })),
}));

describe('header 컴포넌트를 테스트 한다.', () => {
  it('header의 텍스트를 클릭하면 적절한 위치로 이동한다.', () => {
    const header = render(<Header />);
    screen.debug();
  });
});
