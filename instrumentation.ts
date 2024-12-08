export async function initMocks() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./src/mocks/node');
    server.listen();
  } else {
    const { worker } = await import('./src/mocks/browser');
    return worker.start();
  }
}
