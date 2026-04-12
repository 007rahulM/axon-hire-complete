const request = require('supertest');
const { app, closeServer, serverReady } = require('../server');

describe('Rate Limiter - /api/users endpoint', () => {
  beforeAll(async () => {
    // Wait for server and MongoDB to be ready
    await serverReady;
  });

  afterAll(async () => {
    // Clean up after tests
    await closeServer();
  });

  test('Should allow 100 requests to /api/users within the rate limit', async () => {
    const requests = [];
    
    // Send 100 requests
    for (let i = 1; i <= 100; i++) {
      const response = request(app)
        .get('/api/users') // or whatever GET endpoint you have
        .set('Accept', 'application/json');
      
      requests.push(response);
    }

    // Wait for all requests to complete
    const results = await Promise.all(requests);

    // All 100 requests should succeed (not 429)
    results.forEach((response, index) => {
      if (response.status === 429) {
        throw new Error(`Request #${index + 1} got 429 (should not be rate limited yet)`);
      }
      // Status should be 200, 401, or anything except 429
      expect(response.status).not.toBe(429);
    });
  });

  test('Request 101 should get 429 Too Many Requests', async () => {
    const requests = [];

    // Send 101 requests
    for (let i = 1; i <= 101; i++) {
      const response = request(app)
        .get('/api/users')
        .set('Accept', 'application/json');
      
      requests.push(response);
    }

    // Wait for all requests
    const results = await Promise.all(requests);

    // Request 101 (index 100) should be blocked with 429
    const lastRequest = results[results.length - 1];
    expect(lastRequest.status).toBe(429);
    expect(lastRequest.body.message).toContain('Too many requests');
  });

  test('Should NOT get rate limited at request 51 (verifying the fix)', async () => {
    const requests = [];

    // Send 60 requests (well above the old broken limit of 50)
    for (let i = 1; i <= 60; i++) {
      const response = request(app)
        .get('/api/users')
        .set('Accept', 'application/json');
      
      requests.push(response);
    }

    const results = await Promise.all(requests);

    // Check that request 51 is NOT blocked
    const request51 = results[50]; // index 50 = request 51
    expect(request51.status).not.toBe(429);
    
    console.log(`✅ Request 51 status: ${request51.status} (not 429) — Rate limiter fix verified!`);
  });
});