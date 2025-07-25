import { server } from './src/mocks/server';

// 모든 테스트 시작 전에 MSW 서버 시작
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

// 각 테스트 후에 핸들러 리셋
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 종료 후 서버 종료
afterAll(() => {
  server.close();
});
