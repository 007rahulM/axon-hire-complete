// backend/tests/integration/jobs.test.js
const request = require('supertest');
const { app, initialize } = require('../../server'); // ⚠️ Don't import closeServer
const mongoose = require('mongoose');
const Job = require('../../models/Job');

describe('GET /api/jobs', () => {
  beforeAll(async () => {
    // setup.js already connected mongoose to in-memory DB
    // initialize() will skip reconnecting (because readyState !== 0)
    await initialize();
    
    // Safe to delete — this is the in-memory DB, not your real Atlas
    await Job.deleteMany({});
    
    await Job.create({
      title: 'Test Software Engineer',
      company: 'Test Corp',
      location: 'Remote',
      salary: '100k',
      description: 'A test job description',
      requirements: ['React', 'Node.js'],
      postedBy: new mongoose.Types.ObjectId(),
      isOpen: true,
    });
  });

  it('should return 200 with a jobs array', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('jobs');
    expect(Array.isArray(res.body.jobs)).toBe(true);
  });

  it('should return the job we created', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.body.jobs.length).toBe(1);
    expect(res.body.jobs[0].title).toBe('Test Software Engineer');
  });

  it('should filter by title query', async () => {
    const res = await request(app).get('/api/jobs?title=Software');
    expect(res.statusCode).toBe(200);
    expect(res.body.jobs.length).toBe(1);
    
    const emptyRes = await request(app).get('/api/jobs?title=Python');
    expect(emptyRes.body.jobs.length).toBe(0);
  });
});