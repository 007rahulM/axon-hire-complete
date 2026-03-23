const request = require('supertest');
const { app, serverReady, closeServer } = require('../../server');
const mongoose = require('mongoose');
const Job = require('../../models/Job');

describe('GET /api/jobs', () => {
  beforeAll(async () => {
    await serverReady; // Wait for server to be fully ready
    await Job.deleteMany({});
    await Job.create({
      title: 'Integration Test Job',
      company: 'Test Corp',
      location: 'Remote',
      salary: '100k',
      description: 'Test description',
      requirements: ['React', 'Node'],
      postedBy: new mongoose.Types.ObjectId(),
      isOpen: true,
    });
  });

  it('should return list of jobs with pagination', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('jobs');
    expect(res.body.jobs).toBeInstanceOf(Array);
    expect(res.body.jobs.length).toBe(1);
    expect(res.body.jobs[0].title).toBe('Integration Test Job');
    expect(res.body).toHaveProperty('pagination');
  });

  afterAll(async () => {
    await closeServer();
  });
});