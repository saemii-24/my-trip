// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({ id: Date.now(), ...newUser }, { status: 201 });
  }),
];
